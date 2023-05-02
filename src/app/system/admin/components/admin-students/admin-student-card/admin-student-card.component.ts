import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Status, User } from "../../../../../core/entity";

@Component({
    selector: "app-admin-student-card",
    templateUrl: "./admin-student-card.component.html",
    styleUrls: ["./admin-student-card.component.scss"],
})
export class AdminStudentCardComponent {
    @Input() student!: User;

    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

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
