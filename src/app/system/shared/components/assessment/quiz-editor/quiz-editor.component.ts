import { Component, EventEmitter, Input, Output } from "@angular/core";
import { QuizDraft } from "../../../types/quiz.types";
import { v4 as uuid } from "uuid";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "quiz-editor",
    templateUrl: "./quiz-editor.component.html",
    styleUrls: ["./quiz-editor.component.scss"],
})
export class QuizEditorComponent {
    @Input() quizDraft: QuizDraft = { id: uuid() };

    @Input() index?: number;

    @Output() onRemove: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output() quizDraftChange: EventEmitter<QuizDraft> = new EventEmitter<QuizDraft>();

    constructor() {}

    protected readonly Array = Array;

    answerTypeChange(choice: boolean, multiple?: boolean): void {
        this.quizDraft.choice = choice;
        this.quizDraft.multiple = Boolean(multiple);
        this.quizChange();
        if (!multiple) {
            this.quizDraft.answer = [];
        }
    }

    addChoice(): void {
        this.quizDraft.options = [...(this.quizDraft.options ?? []), { id: uuid(), value: "" }];
        this.quizChange();
    }

    removeChoice(option: { id: string; value: string }): void {
        this.quizDraft.options = this.quizDraft.options?.filter(o => o.id !== option.id);
        this.quizDraft.answer = this.quizDraft.answer?.filter(a => this.quizDraft.options?.map(o => o.id)?.includes(a)) ?? [];
        this.quizChange();
    }

    quizChange(): void {
        this.quizDraftChange.emit(this.quizDraft);
    }

    answerChange(id: string): void {
        if (this.quizDraft.multiple) {
            if (this.quizDraft.answer?.includes(id)) {
                this.quizDraft.answer = this.quizDraft.answer?.filter(a => a !== id);
            } else {
                this.quizDraft.answer = [...(this.quizDraft.answer ?? []), id];
            }
        } else {
            this.quizDraft.answer = [id];
        }
        this.quizChange();
    }
}
