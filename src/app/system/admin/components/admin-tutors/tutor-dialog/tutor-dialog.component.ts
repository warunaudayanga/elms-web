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
        this.tutorForm = this.fb.group({
            username: [config.data?.username ?? "", Validators.required],
            password: [config.data ? "password" : "", Validators.required],
            firstName: [config.data?.firstName ?? "", Validators.required],
            lastName: [config.data?.lastName ?? "", Validators.required],
            email: [config.data?.email ?? "", [Validators.required, Validators.email]],
            dob: [config.data?.dob ? ymdToDate(config.data?.dob) : null, Validators.required],
            phone: [config.data?.phone ?? "", Validators.required],
            areaId: [config.data?.areaId ?? null, Validators.required],
            address: [config.data?.address ?? "", Validators.required],
            school: [config.data?.school ?? "", Validators.required],
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
        if (this.config.data) {
            tutorDto.password = undefined;
        }
        this.userService.createTutor(tutorDto).subscribe({
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
