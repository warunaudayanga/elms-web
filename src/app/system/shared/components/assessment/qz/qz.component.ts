import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Quiz } from "../../../interfaces/quiz.interfaces";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "qz",
    templateUrl: "./qz.component.html",
    styleUrls: ["./qz.component.scss"],
})
export class QzComponent implements OnInit {
    @Input() quiz!: Quiz;

    @Input() answer: string[] = [];

    @Output() answerChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    constructor() {}

    ngOnInit(): void {
        if (this.quiz.answer) {
            this.answer = this.quiz.answer;
        }
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

    getChecked(option: string): boolean {
        if (this.answer) {
            return Boolean(this.quiz.multiple ? this.answer?.includes(option) : this.answer?.[0] === option);
        }
        return Boolean(this.quiz.multiple ? this.quiz.answer?.includes(option) : this.quiz.answer?.[0] === option);
    }
}
