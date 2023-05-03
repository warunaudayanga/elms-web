import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogConfig } from "../../../../../core/modules/dialog/interfaces";
import { AppService } from "../../../../../app.service";
import { TutorService } from "../../../../../core/services/elms/tutor.service";
import { Assessment } from "../../../../../core/entity/interfaces/assessment.interface";
import { QuizDraft } from "../../../types/quiz.types";
import { DialogService } from "../../../../../core/modules/dialog";
import { v4 as uuid } from "uuid";
import { Store } from "@ngxs/store";
import { ClearAssessmentDraft, SaveAssessmentDrafts } from "../../../../../core/store/quiz/quiz.action";
import { QuizState } from "../../../../../core/store/quiz/quiz.state";
import { AssessmentDto } from "../../../dtos/assessment.dto";
import { HttpError } from "../../../../../core/interfaces";
import { draftToQuiz, quizToDraft } from "../../../utils/quiz.utils";

@Component({
    selector: "app-assessment-dialog",
    templateUrl: "./assessment-dialog.component.html",
    styleUrls: ["./assessment-dialog.component.scss"],
})
export class AssessmentDialogComponent implements AfterViewInit {
    @ViewChild("content", { read: ElementRef }) contentRef!: ElementRef<HTMLDivElement>;

    assessmentForm: FormGroup;

    questions?: QuizDraft[];

    quizDrafts?: QuizDraft[];

    loading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: DialogConfig<{ classRoomId: number; assessment?: Assessment }>,
        private readonly dialogRef: MatDialogRef<AssessmentDialogComponent, Assessment>,
        private readonly app: AppService,
        private readonly fb: FormBuilder,
        private readonly store: Store,
        private readonly tutorService: TutorService,
        private readonly dialogService: DialogService,
    ) {
        this.assessmentForm = this.fb.group({
            name: ["", Validators.required],
            description: [""],
            passMarks: [null],
        });
        const assessmentDraft = this.store.selectSnapshot(QuizState.getAssessmentDraft)(this.config.data!.classRoomId);
        if (this.config.data?.assessment) {
            this.assessmentForm.patchValue({
                name: this.config.data.assessment.name,
                description: this.config.data.assessment.description,
                passMarks: this.config.data.assessment.passMarks,
            });
            this.quizDrafts = this.config?.data?.assessment?.quizzes?.map(quizToDraft);
        } else if (assessmentDraft) {
            this.assessmentForm.patchValue({
                name: assessmentDraft.name,
                description: assessmentDraft.description,
                passMarks: assessmentDraft.passMarks,
            });
            this.quizDrafts = assessmentDraft.drafts;
        } else {
            this.questions = [];
        }
    }

    ngAfterViewInit(): void {
        if (this.quizDrafts) {
            setTimeout(() => {
                this.questions = [...this.quizDrafts!];
                this.quizDrafts = undefined;
            }, 100);
        }
    }

    close(): void {
        this.dialogRef.close();
    }

    saveAssessment(): void {
        if (this.assessmentForm.invalid) {
            return;
        }
        this.loading = true;
        const assessmentDto: AssessmentDto = {
            name: this.assessmentForm.value.name,
            description: this.assessmentForm.value.description,
            quizzes: this.questions?.map(draftToQuiz),
            // answers: this.assessmentForm.value.answers, // TODO;
            passMarks: Number(this.assessmentForm.value.passMarks),
        };
        (this.config.data?.assessment
            ? this.tutorService.updateAssessment(this.config.data.assessment.id, assessmentDto)
            : this.tutorService.createAssessment(this.config.data!.classRoomId, assessmentDto)
        ).subscribe({
            next: assessment => {
                this.loading = false;
                this.dialogRef.close(assessment);
                this.store.dispatch(new ClearAssessmentDraft(this.config.data!.classRoomId));
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.app.error(err.error?.message ?? "Error occurred!");
            },
        });
    }

    protected readonly Array = Array;

    removeQuiz(quiz: QuizDraft): void {
        this.dialogService.confirm("Are you sure you want to remove this question?", { ok: "Remove" }).subscribe(confirmation => {
            if (confirmation) {
                this.questions = this.questions?.filter(q => q !== quiz);
                this.saveDraft();
            }
        });
    }

    addQuiz(): void {
        this.questions = [
            ...(this.questions ?? []),
            {
                id: uuid(),
                question: "",
                choice: true,
                multiple: false,
                options: [{ value: "" }, { value: "" }],
            },
        ];
        this.saveDraft();
        this.scrollToBottom();
    }

    quizChange(): void {
        this.saveDraft();
    }

    saveDraft(): void {
        this.store.dispatch(
            new SaveAssessmentDrafts({
                classRoomId: this.config.data!.classRoomId,
                name: this.assessmentForm.value.name,
                description: this.assessmentForm.value.description,
                passMarks: Number(this.assessmentForm.value.passMarks),
                drafts: [...(this.questions ?? [])],
            }),
        );
    }

    scrollToBottom(): void {
        setTimeout(() => {
            if (this.contentRef.nativeElement) {
                this.contentRef.nativeElement.scrollTo({
                    top: this.contentRef.nativeElement.scrollHeight,
                    behavior: "smooth",
                });
            }
        });
    }
}
