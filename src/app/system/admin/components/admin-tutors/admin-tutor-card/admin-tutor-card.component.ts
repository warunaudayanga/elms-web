import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Status, User } from "../../../../../core/entity";

@Component({
    selector: "app-admin-tutor-card",
    templateUrl: "./admin-tutor-card.component.html",
    styleUrls: ["./admin-tutor-card.component.scss"],
})
export class AdminTutorCardComponent {
    @Input() tutor!: User;

    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output() onEdit: EventEmitter<User> = new EventEmitter<User>();

    @Output() onChangeStatus: EventEmitter<{ id: number; status: Status }> = new EventEmitter<{
        id: number;
        status: Status;
    }>();

    constructor() {}

    protected readonly Status = Status;

    changeStatus(id: number, status: Status): void {
        this.onChangeStatus.emit({ id, status });
    }

    cardClick(e: MouseEvent): void {
        if (!(e.target as HTMLDivElement).closest("ng-button")) {
            this.onClick.emit(e);
        }
    }
}
