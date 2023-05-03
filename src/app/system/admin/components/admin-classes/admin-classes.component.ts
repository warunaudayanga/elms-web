import { Component, OnInit } from "@angular/core";
import { ClassRoomService } from "../../../../core/services/elms/class-room.service";
import { ClassRoom, ClassSchedule, Status } from "../../../../core/entity";
import { AppService } from "../../../../app.service";
import { DialogService } from "../../../../core/modules/dialog";
import { SocketService } from "../../../../core/services/socket.service";
import { AppEvent } from "../../../../core/enums/app-event.enum";
import { replaceItem } from "../../../../core/utils/array.utils";

@Component({
    selector: "app-admin-classes",
    templateUrl: "./admin-classes.component.html",
    styleUrls: ["./admin-classes.component.scss"],
})
export class AdminClassesComponent implements OnInit {
    loading: boolean = false;

    error: boolean = false;

    classes: ClassRoom[] = [];

    constructor(
        private readonly app: AppService,
        private dialogService: DialogService,
        private readonly classRoomService: ClassRoomService,
        private readonly socketService: SocketService,
    ) {
        this.socketService
            .onMessage<ClassRoom | ClassSchedule>([AppEvent.CLASS_REQUESTED, AppEvent.CLASS_UPDATED, AppEvent.SCHEDULE_UPDATED])
            ?.subscribe(res => {
                switch (res.event) {
                    case AppEvent.CLASS_REQUESTED:
                        this.classes.push(res.data as ClassRoom);
                        break;
                    case AppEvent.CLASS_UPDATED:
                        replaceItem(this.classes, res.data as ClassRoom, "id", true);
                        break;
                    case AppEvent.SCHEDULE_UPDATED:
                        const classRoom = this.classes.find(cr => cr.id === (res.data as ClassSchedule).classRoom?.id);
                        if (classRoom) {
                            classRoom.schedule = res.data as ClassSchedule;
                        }
                        break;
                }
                this.sortClasses();
            });
    }

    ngOnInit(): void {
        this.getClasses();
    }

    refresh(): void {
        this.getClasses();
    }

    sortClasses(): void {
        this.classes.sort((a, b) => {
            if (a.changeRequest !== null && b.changeRequest === null) {
                return -1;
            }
            if (a.changeRequest === null && b.changeRequest !== null) {
                return 1;
            }

            // For items where schedule exists and has changeRequest
            if (a.schedule && a.schedule.changeRequest !== null && (!b.schedule || b.schedule.changeRequest === null)) {
                return -1;
            }
            if (b.schedule && b.schedule.changeRequest !== null && (!a.schedule || a.schedule.changeRequest === null)) {
                return 1;
            }

            if (a.status === Status.PENDING && b.status !== Status.PENDING) {
                return -1;
            }
            if (a.status !== Status.PENDING && b.status === Status.PENDING) {
                return 1;
            }

            if (a.schedule?.status === Status.PENDING && b.schedule?.status !== Status.PENDING) {
                return -1;
            }
            if (a.schedule?.status !== Status.PENDING && b.schedule?.status === Status.PENDING) {
                return 1;
            }

            if (a.status === Status.INACTIVE && b.status !== Status.INACTIVE) {
                return -1;
            }
            if (a.status !== Status.INACTIVE && b.status === Status.INACTIVE) {
                return 1;
            }

            // If none of the above conditions match, the elements are equal for sorting purposes:
            return 0;
        });
    }

    getClasses(): void {
        this.loading = true;
        this.error = false;
        this.classRoomService.getAll().subscribe({
            next: classes => {
                this.loading = false;
                this.classes = classes;
                this.sortClasses();
            },
            error: err => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    changeStatusPrompt({ id, status }: { id: number; status: Status }): void {
        if (status === Status.INACTIVE) {
            const action = this.classes!.find(c => c.id === id)!.status === Status.PENDING ? "Decline" : "Deactivate";
            const confirmation = this.dialogService.confirm(`Are you sure you want to ${action.toLowerCase()} this class?`, {
                ok: action,
            });
            confirmation.subscribe(confirm => {
                if (confirm) {
                    this.changeStatus(id, status);
                }
            });
            return;
        }
        this.changeStatus(id, status);
    }

    changeStatus(id: number, status: Status): void {
        const classRoom = this.classes!.find(c => c.id === id)!;
        const prevStatus = classRoom?.status;
        classRoom.status = status;
        this.classRoomService.updateStatus(id, status).subscribe({
            next: () => {
                this.app.success("Class updated successfully!");
            },
            error: err => {
                this.loading = false;
                this.error = true;
                classRoom.status = prevStatus;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }
}
