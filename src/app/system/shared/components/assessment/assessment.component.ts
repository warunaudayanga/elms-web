import { Component, OnInit } from "@angular/core";
import { Quiz, QuizAnswer } from "../../interfaces/quiz.interfaces";
import { StudentService } from "../../../../core/services/elms/student.service";
import { ActivatedRoute } from "@angular/router";
import { HttpError } from "../../../../core/interfaces";
import { AppService } from "../../../../app.service";
import { DialogService } from "../../../../core/modules/dialog";
import { Assessment } from "../../../../core/entity/interfaces/assessment.interface";
import { Store } from "@ngxs/store";
import { ClearQuizAnswers, SaveQuizAnswers } from "../../../../core/store/quiz/quiz.action";
import { QuizState } from "../../../../core/store/quiz/quiz.state";
import { isAfter, isBefore, isBetween } from "../../../../core/utils";

@Component({
    selector: "app-assessment",
    templateUrl: "./assessment.component.html",
    styleUrls: ["./assessment.component.scss"],
})
export class AssessmentComponent implements OnInit {
    quizzes: Quiz[] = [];

    answers: QuizAnswer[] = [];

    assessmentId?: number;

    assessment?: Assessment;

    loading: boolean = false;

    submitting: boolean = false;

    error: boolean = false;

    protected readonly isBefore = isBefore;

    protected readonly isAfter = isAfter;

    protected readonly isBetween = isBetween;

    constructor(
        private readonly app: AppService,
        private readonly store: Store,
        private readonly studentService: StudentService,
        private readonly route: ActivatedRoute,
        private readonly dialogService: DialogService,
    ) {}

    ngOnInit(): void {
        this.assessmentId = this.route.snapshot.params["id"];
        this.getAssessment();
    }

    getAssessment(): void {
        this.loading = true;
        this.studentService.getAssessment(this.assessmentId!).subscribe({
            next: assessment => {
                this.loading = false;
                this.assessment = assessment;
                if (!assessment.submission) {
                    this.quizzes = this.assessment?.quizzes ?? [];
                    this.answers = this.store.selectSnapshot(QuizState.getQuizAnswerList)(this.assessmentId!)?.answers ?? [];
                } else if (isAfter(assessment.endTime)) {
                    this.quizzes = this.assessment?.quizzes ?? [];
                    this.answers = this.assessment.submission!.answers ?? [];
                }
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    showSubmitConfirmation(): void {
        let msg =
            this.assessment?.quizzes?.length !== this.answers.filter(a => a.answer.length).length
                ? "You have not answered all the questions. Are you sure you want to submit?"
                : "Did you re check your answers?";

        this.dialogService.confirm(msg, { ok: "Submit" }).subscribe(confirmation => {
            if (confirmation) {
                this.submit();
            }
        });
    }

    submit(): void {
        this.submitting = true;
        this.studentService.submitAssessment(this.assessmentId!, this.answers).subscribe({
            next: assessmentSubmission => {
                this.assessment!.submission = assessmentSubmission;
                this.store.dispatch(new ClearQuizAnswers(this.assessmentId!));
                this.submitting = false;
            },
            error: (err: HttpError) => {
                this.submitting = false;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    showUnSubmitConfirmation(): void {
        this.dialogService.confirm("Are you sure you want to unsubmit?", { ok: "Unsubmit" }).subscribe(confirmation => {
            if (confirmation) {
                this.unsubmit();
            }
        });
    }

    unsubmit(): void {
        this.submitting = true;
        this.studentService.unsubmitAssessment(this.assessment!.submission!.id!).subscribe({
            next: assessmentSubmission => {
                this.submitting = false;
                this.assessment!.submissions?.filter(s => s.id !== this.assessment!.submission!.id);
                this.assessment!.submission = undefined;
                this.quizzes = this.assessment?.quizzes ?? [];
                this.answers = assessmentSubmission.answers ?? [];
                this.store.dispatch(new SaveQuizAnswers({ assessmentId: this.assessmentId!, answers: this.answers }));
            },
            error: (err: HttpError) => {
                this.submitting = false;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    saveAnswers(): void {
        this.store.dispatch(new SaveQuizAnswers({ assessmentId: this.assessmentId!, answers: this.answers }));
    }

    getMarks(assessment: Assessment): number {
        return (
            assessment.submission?.answers?.filter(ans =>
                assessment?.quizzes?.find(q => q.id === ans.id)?.answer?.every(qAns => ans.answer?.includes(qAns)),
            ).length ?? 0
        );
    }
}
