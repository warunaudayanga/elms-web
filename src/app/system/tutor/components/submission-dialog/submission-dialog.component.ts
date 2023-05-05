import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogConfig } from "../../../../core/modules/dialog/interfaces";
import { AssessmentSubmission } from "../../../../core/entity/interfaces/assessment-submission.interface";
import { Quiz } from "../../../shared/interfaces/quiz.interfaces";

@Component({
    selector: "app-submission",
    templateUrl: "./submission-dialog.component.html",
    styleUrls: ["./submission-dialog.component.scss"],
})
export class SubmissionDialogComponent {
    loading: boolean = false;

    error: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: DialogConfig<{ quizzes: Quiz[]; submission: AssessmentSubmission }>,
        private readonly dialogRef: MatDialogRef<SubmissionDialogComponent, AssessmentSubmission>,
    ) {}

    close(): void {
        this.dialogRef.close();
    }
}
