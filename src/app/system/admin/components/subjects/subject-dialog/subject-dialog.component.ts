import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogConfig } from "../../../../../core/modules/dialog/interfaces";
import { ClassSubject } from "../../../../../core/entity";
import { AppService } from "../../../../../app.service";
import { ClassSubjectService } from "../../../../../core/services/elms/subject.service";
import { HttpError } from "../../../../../core/interfaces";

@Component({
    selector: "app-subject-dialog",
    templateUrl: "./subject-dialog.component.html",
    styleUrls: ["./subject-dialog.component.scss"],
})
export class SubjectDialogComponent {
    subjectForm: FormGroup;

    loading: boolean = false;

    error: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: DialogConfig<ClassSubject>,
        private readonly dialogRef: MatDialogRef<SubjectDialogComponent, ClassSubject>,
        private readonly app: AppService,
        private readonly fb: FormBuilder,
        private readonly subjectService: ClassSubjectService,
    ) {
        this.subjectForm = this.fb.group({
            name: [config.data?.name ?? "", Validators.required],
            description: [config.data?.description ?? ""],
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    saveSubject(): void {
        if (this.subjectForm.invalid) {
            return;
        }
        this.loading = true;
        (this.config.data
            ? this.subjectService.update(this.config.data!.id, this.subjectForm.value)
            : this.subjectService.create(this.subjectForm.value)
        ).subscribe({
            next: subject => {
                this.loading = false;
                this.app.success("ClassSubject created successfully.");
                this.dialogRef.close(subject);
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }
}
