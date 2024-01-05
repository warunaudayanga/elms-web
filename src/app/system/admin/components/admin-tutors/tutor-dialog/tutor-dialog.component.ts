import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Area, User } from "../../../../../core/entity";
import { AppService } from "../../../../../app.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { firstValueFrom } from "rxjs";
import { HttpError } from "../../../../../core/interfaces";
import { UserService } from "../../../../../core/services/elms/user.service";
import { CommonService } from "../../../../../core/services/elms/common.service";
import { DialogConfig } from "../../../../../core/modules/dialog/interfaces";
import { ymdToDate } from "../../../../../core/utils";
import { TutorDto } from "../../../dtos/tutor.dto";

@Component({
    selector: "app-tutor-dialog",
    templateUrl: "./tutor-dialog.component.html",
    styleUrls: ["./tutor-dialog.component.scss"],
})
export class TutorDialogComponent implements OnInit {
    tutorForm: FormGroup;

    tutor?: User;

    areas: Area[] = [];

    loading: boolean = false;

    error: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: DialogConfig<User>,
        private readonly dialogRef: MatDialogRef<TutorDialogComponent, User>,
        private readonly app: AppService,
        private readonly fb: FormBuilder,
        private readonly userService: UserService,
        private readonly commonService: CommonService,
    ) {
        this.tutor = config.data;
        this.tutorForm = this.fb.group({
            username: [this.tutor?.username ?? "", Validators.required],
            password: [this.tutor ? "password" : "", Validators.required],
            firstName: [this.tutor?.firstName ?? "", Validators.required],
            lastName: [this.tutor?.lastName ?? "", Validators.required],
            email: [this.tutor?.email ?? "", [Validators.required, Validators.email]],
            dob: [this.tutor?.dob ? ymdToDate(this.tutor?.dob) : null, Validators.required],
            phone: [this.tutor?.phone ?? "", Validators.required],
            areaId: [this.tutor?.areaId ?? null, Validators.required],
            address: [this.tutor?.address ?? "", Validators.required],
            school: [this.tutor?.school ?? "", Validators.required],
        });
    }

    async ngOnInit(): Promise<void> {
        await this.getData();
    }

    async getData(): Promise<void> {
        await firstValueFrom(this.commonService.getAreas())
            .then(areas => {
                this.areas = areas;
            })
            .catch((err: HttpError) => {
                this.error = true;
                this.app.error(err.error?.message ?? "Error occurred!");
            });
    }

    close(): void {
        this.dialogRef.close();
    }

    saveTutor(): void {
        if (this.tutorForm.invalid) {
            return;
        }
        this.loading = true;
        const tutorDto: TutorDto = this.tutorForm.value;
        if (this.tutor) {
            tutorDto.password = undefined;
        }
        (this.tutor ? this.userService.updateTutor(this.tutor.id, tutorDto) : this.userService.createTutor(tutorDto)).subscribe({
            next: tutor => {
                this.loading = false;
                this.app.success("Class created successfully.");
                this.dialogRef.close(tutor);
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }
}
