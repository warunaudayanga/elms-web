import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { ClassRoom, Status } from "../../../../core/entity";
import { Store } from "@ngxs/store";
import { AuthState } from "../../../../core/store";
import { AppService } from "../../../../app.service";

@Component({
    selector: "app-my-class-card",
    templateUrl: "./my-class-card.component.html",
    styleUrls: ["./my-class-card.component.scss"],
})
export class MyClassCardComponent implements OnChanges {
    @Input() classRoom!: ClassRoom;

    @Input() buttonSpin: boolean = false;

    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output() onAction: EventEmitter<ClassRoom> = new EventEmitter<ClassRoom>();

    studentId?: number;

    disableButton: boolean = false;

    constructor(public app: AppService, private store: Store) {
        this.studentId = this.store.selectSnapshot(AuthState.loggedUser)?.id;
    }

    get isPending(): boolean {
        return this.classRoom.status === Status.PENDING;
    }

    get isDeactivated(): boolean {
        return this.classRoom.status === Status.INACTIVE;
    }

    get isActive(): boolean {
        return this.classRoom.status === Status.ACTIVE;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["buttonSpin"]) {
            this.buttonSpin = changes["buttonSpin"].currentValue;
        }
    }

    view(): void {
        this.app.load([this.app.isTutor ? "tutor" : "student", "my-classes", this.classRoom.id]);
    }

    joinZoom(): void {
        this.onAction.emit(this.classRoom);
    }

    cardClick(e: MouseEvent): void {
        if (!(e.target as HTMLDivElement).closest("ng-button")) {
            this.onClick.emit(e);
        }
    }

    protected readonly Status = Status;
}
