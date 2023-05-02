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
    }

    addChoice(): void {
        this.quizDraft.options = [...(this.quizDraft.options ?? []), { value: "" }];
        this.quizChange();
    }

    removeChoice(option: { value: string }): void {
        this.quizDraft.options = this.quizDraft.options?.filter(o => o !== option);
        this.quizChange();
    }

    quizChange(): void {
        this.quizDraftChange.emit(this.quizDraft);
    }
}
