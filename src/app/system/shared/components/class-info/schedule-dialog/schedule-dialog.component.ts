import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogConfig } from "../../../../../core/modules/dialog/interfaces";
import { ClassSchedule, Day } from "../../../../../core/entity";
import { AppService } from "../../../../../app.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TutorService } from "../../../../../core/services/elms/tutor.service";
import { dateToHms, enumToKeyValue, hmsToDate } from "../../../../../core/utils";
import { KeyValue } from "../../../../../core/interfaces/util.interfaces";
import { HttpError } from "../../../../../core/interfaces";
import { ScheduleDto } from "../../../../tutor/dtos/schedule.dto";
import { ZoomErrors } from "../../../../student/enums/zoom.error.responses.enum";
import { SetAuthorized } from "../../../../../core/store/zoom/zoom.action";
import { Store } from "@ngxs/store";
import { ZoomService } from "../../../../../core/services/elms/zoom.service";

@Component({
    selector: "app-schedule-dialog",
    templateUrl: "./schedule-dialog.component.html",
    styleUrls: ["./schedule-dialog.component.scss"],
})
export class ScheduleDialogComponent {
    scheduleForm: FormGroup;

    days: KeyValue<Day>[] = enumToKeyValue(Day);

    loading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: DialogConfig<{ classRoomId: number; schedule?: ClassSchedule }>,
        private readonly dialogRef: MatDialogRef<ScheduleDialogComponent, ClassSchedule>,
        private readonly app: AppService,
        private readonly store: Store,
        private readonly fb: FormBuilder,
        private readonly tutorService: TutorService,
        private readonly zoomService: ZoomService,
    ) {
        this.scheduleForm = this.fb.group({
            day: [null, Validators.required],
            startTime: [null, Validators.required],
            endTime: [null, Validators.required],
        });
        if (this.config.data?.schedule) {
            this.scheduleForm.patchValue({
                day: this.config.data.schedule.day,
                startTime: hmsToDate(this.config.data.schedule.startTime),
                endTime: hmsToDate(this.config.data.schedule.endTime),
            });
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    setSchedule(): void {
        if (this.scheduleForm.invalid) {
            return;
        }
        this.loading = true;
        const setScheduleDto: ScheduleDto = {
            day: this.scheduleForm.value.day,
            startTime: dateToHms(this.scheduleForm.value.startTime),
            endTime: dateToHms(this.scheduleForm.value.endTime),
        };
        this.tutorService.setSchedule(this.config.data!.classRoomId, setScheduleDto).subscribe({
            next: schedule => {
                this.loading = false;
                this.dialogRef.close(schedule);
            },
            error: (err: HttpError) => {
                this.loading = false;
                if (err.error?.code === ZoomErrors.ZOOM_401_UNAUTHORIZED) {
                    this.store.dispatch(new SetAuthorized(false));
                    this.zoomService.promptAuthorization();
                    this.close();
                    return;
                }
                this.loading = false;
                this.app.error(err.error?.message ?? "Error occurred!");
            },
        });
    }
}
