import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Quiz } from "../../../interfaces/quiz.interfaces";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "qz",
    templateUrl: "./qz.component.html",
    styleUrls: ["./qz.component.scss"],
})
export class QzComponent implements OnChanges {
    @Input() quiz!: Quiz;

    @Input() answer: string[] = [];

    @Input() assess: boolean = false;

    @Output() answerChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    checkedValues?: string[];

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["quiz"]) {
            this.quiz = changes["quiz"].currentValue;
        }
        if (changes["answer"]) {
            this.answer = changes["answer"].currentValue;
        }
        this.updateChecked();
    }

    onRadioChange(value: string): void {
        this.answer = [value];
        this.answerChange.emit(this.answer);
    }

    onCheckChange(value: string, checked: boolean): void {
        if (checked) {
            if (this.answer) {
                this.answer.push(value);
            } else {
                this.answer = [value];
            }
        } else {
            this.answer = this.answer?.filter(ans => ans !== value);
        }
        this.answerChange.emit(this.answer);
    }

    onInputChange(): void {
        this.answerChange.emit(this.answer);
    }

    updateChecked(): void {
        this.checkedValues = this.answer;
    }

    isCorrect(): boolean {
        return Boolean(
            this.answer?.length && this.answer?.length === this.quiz.answer?.length && this.quiz.answer?.every(ans => this.answer?.includes(ans)),
        );
    }
}
