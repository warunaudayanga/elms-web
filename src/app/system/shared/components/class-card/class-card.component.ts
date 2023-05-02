import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { ClassRoom } from "../../../../core/entity";
import { Store } from "@ngxs/store";
import { AuthState } from "../../../../core/store";

@Component({
    selector: "app-class-card",
    templateUrl: "./class-card.component.html",
    styleUrls: ["./class-card.component.scss"],
})
export class ClassCardComponent implements OnChanges {
    @Input() classRoom!: ClassRoom;

    @Input() buttonSpin: boolean = false;

    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output() onAction: EventEmitter<void> = new EventEmitter();

    studentId?: number;

    disableButton: boolean = false;

    constructor(private store: Store) {
        this.studentId = this.store.selectSnapshot(AuthState.loggedUser)?.id;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["buttonSpin"]) {
            this.buttonSpin = changes["buttonSpin"].currentValue;
        }
    }

    action(): void {
        this.onAction.emit();
    }

    getLabel(): string {
        if (this.studentId && this.classRoom?.classStudents?.find(s => s.studentId === this.studentId)) {
            this.disableButton = true;
            return "Already Enrolled";
        }
        return "Enroll Now";
    }

    cardClick(e: MouseEvent): void {
        if (!(e.target as HTMLDivElement).closest("ng-button")) {
            this.onClick.emit(e);
        }
    }
}
