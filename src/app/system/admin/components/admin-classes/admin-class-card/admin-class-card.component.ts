import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ClassRoom, Status } from "../../../../../core/entity";
import { AppService } from "../../../../../app.service";
import { ClassRoomService } from "../../../../../core/services/elms/class-room.service";
import { HttpError } from "../../../../../core/interfaces";
import { ClassScheduleService } from "../../../../../core/services/elms/class-schedule.service";

@Component({
    selector: "app-admin-class-card",
    templateUrl: "./admin-class-card.component.html",
    styleUrls: ["./admin-class-card.component.scss"],
})
export class AdminClassCardComponent {
    @Input() classRoom!: ClassRoom;

    @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output() onChangeStatus: EventEmitter<{ id: number; status: Status }> = new EventEmitter<{
        id: number;
        status: Status;
    }>();

    constructor(
        private readonly app: AppService,
        private readonly classRoomService: ClassRoomService,
        private readonly classScheduleService: ClassScheduleService,
    ) {}

    protected readonly Status = Status;

    changeStatus(id: number, status: Status): void {
        this.onChangeStatus.emit({ id, status });
    }

    cardClick(e: MouseEvent): void {
        if (!(e.target as HTMLDivElement).closest("ng-button")) {
            this.onClick.emit(e);
        }
    }

    approveUpdate(id: number, approve: boolean): void {
        const classDto: Partial<ClassRoom> = approve
            ? {
                  name: this.classRoom.changeRequest?.name,
                  description: this.classRoom.changeRequest?.description,
                  payment: this.classRoom.changeRequest?.payment,
                  changeRequest: null,
              }
            : { changeRequest: null };
        this.classRoomService.update(id, classDto).subscribe({
            next: classRoom => {
                this.app.success("Changes approved.");
                this.classRoom = classRoom;
            },
            error: (err: HttpError) => {
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    approveSchedule(id: number, approve: boolean): void {
        (this.classRoom.schedule?.status === Status.PENDING
            ? this.classScheduleService.updateStatus(id, approve ? Status.ACTIVE : Status.INACTIVE)
            : this.classScheduleService.update(
                  id,
                  approve
                      ? {
                            day: this.classRoom?.schedule?.changeRequest?.day,
                            startTime: this.classRoom.schedule?.changeRequest?.startTime,
                            endTime: this.classRoom.schedule?.changeRequest?.endTime,
                            changeRequest: null,
                        }
                      : { changeRequest: null },
              )
        ).subscribe({
            next: schedule => {
                this.app.success("Changes approved.");
                this.classRoom.schedule = schedule;
            },
            error: (err: HttpError) => {
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    protected readonly Number = Number;
}
