import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges } from "@angular/core";
import { QzComponent } from "../qz/qz.component";
import { Quiz, QuizAnswer } from "../../../interfaces/quiz.interfaces";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "qz-list",
    templateUrl: "./qz-list.component.html",
    styleUrls: ["./qz-list.component.scss"],
})
export class QzListComponent implements OnChanges, AfterContentInit {
    @Input() items?: Quiz[] = [];

    @Input() answers: QuizAnswer[] = [];

    @Input() assess: boolean = false;

    @Output() answersChange: EventEmitter<QuizAnswer[]> = new EventEmitter<QuizAnswer[]>();

    @ContentChildren(QzComponent) qzComponents?: QueryList<QzComponent>;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["answers"]) {
            this.answers = changes["answers"].currentValue;
        }
        if (changes["items"]) {
            this.items = changes["items"].currentValue;
            this.items?.forEach((qz, i) => {
                if (!qz.heading) {
                    qz.heading = `Question ${i + 1}`;
                }
                if (qz.answer?.length === 0) {
                    qz.answer = [];
                }
            });
        }
    }

    ngAfterContentInit(): void {
        this.qzComponents?.forEach((qz, i) => {
            if (qz.quiz && !qz.quiz?.heading) {
                qz.quiz.heading = `Question ${i + 1}`;
            }
            if (qz.answer?.length === 0) {
                qz.answer = [];
            }
        });
    }

    onAnswerChange(id: string, answer: string[]): void {
        const qAns = this.answers.find(ans => ans.id === id);
        if (qAns) {
            qAns.answer = answer;
        } else {
            this.answers.push({ id, answer });
        }
        this.answersChange.emit(this.answers);
    }

    getAnswer(quiz: Quiz): string[] {
        return this.answers.find(ans => ans.id === quiz.id)?.answer ?? [];
    }
}
