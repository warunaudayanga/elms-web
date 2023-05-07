import { Component, OnInit } from "@angular/core";
import { AppService } from "../../../../app.service";
import { Store } from "@ngxs/store";
import { ActivatedRoute } from "@angular/router";
import { DialogService } from "../../../../core/modules/dialog";
import { HttpError } from "../../../../core/interfaces";
import { Assessment } from "../../../../core/entity/interfaces/assessment.interface";
import { AssessmentSubmission } from "../../../../core/entity/interfaces/assessment-submission.interface";
import { TutorService } from "../../../../core/services/elms/tutor.service";
import { SubmissionDialogComponent } from "../submission-dialog/submission-dialog.component";
import { Quiz } from "../../../shared/interfaces/quiz.interfaces";

@Component({
    selector: "app-submissions",
    templateUrl: "./submissions.component.html",
    styleUrls: ["./submissions.component.scss"],
})
export class SubmissionsComponent implements OnInit {
    assessmentId?: number;

    assessment?: Assessment;

    loading: boolean = false;

    error: boolean = false;

    constructor(
        private readonly app: AppService,
        private readonly store: Store,
        private readonly tutorService: TutorService,
        private readonly route: ActivatedRoute,
        private readonly dialogService: DialogService,
    ) {}

    ngOnInit(): void {
        this.assessmentId = this.route.snapshot.params["assessmentId"];
        this.getAssessment();
    }

    getAssessment(): void {
        this.loading = true;
        this.tutorService.getAssessment(this.assessmentId!).subscribe({
            next: assessment => {
                this.loading = false;
                this.assessment = assessment;
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    view(submission: AssessmentSubmission): void {
        if (this.assessment?.quizzes) {
            this.dialogService.open<any, { quizzes: Quiz[]; submission: AssessmentSubmission }>(SubmissionDialogComponent, {
                data: {
                    data: { quizzes: this.assessment.quizzes, submission },
                },
                width: "700px",
                disableClose: true,
                panelClass: ["dialog-container", "primary"],
                maxWidth: "700px",
            });
        }
    }

    getMarks(submission: AssessmentSubmission): number {
        return (
            submission.answers?.filter(ans => this.assessment?.quizzes?.find(q => q.id === ans.id)?.answer?.every(qAns => ans.answer?.includes(qAns)))
                .length ?? 0
        );
    }
}
