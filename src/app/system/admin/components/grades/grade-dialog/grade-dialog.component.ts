import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Grade } from "../../../../../core/entity";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogConfig } from "../../../../../core/modules/dialog/interfaces";
import { AppService } from "../../../../../app.service";
import { HttpError } from "../../../../../core/interfaces";
import { GradeService } from "../../../../../core/services/elms/grade.service";

@Component({
    selector: "app-grade-dialog",
    templateUrl: "./grade-dialog.component.html",
    styleUrls: ["./grade-dialog.component.scss"],
})
export class GradeDialogComponent {
    gradeForm: FormGroup;

    loading: boolean = false;

    error: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: DialogConfig<Grade>,
        private readonly dialogRef: MatDialogRef<GradeDialogComponent, Grade>,
        private readonly app: AppService,
        private readonly fb: FormBuilder,
        private readonly gradeService: GradeService,
    ) {
        this.gradeForm = this.fb.group({
            name: [config.data?.name ?? "", Validators.required],
            description: [config.data?.description ?? ""],
        });
    }

    close(): void {
        this.dialogRef.close();
    }

    saveGrade(): void {
        if (this.gradeForm.invalid) {
            return;
        }
        this.loading = true;
        (this.config.data
            ? this.gradeService.update(this.config.data!.id, this.gradeForm.value)
            : this.gradeService.create(this.gradeForm.value)
        ).subscribe({
            next: grade => {
                this.loading = false;
                this.app.success("Grade created successfully.");
                this.dialogRef.close(grade);
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }
}
