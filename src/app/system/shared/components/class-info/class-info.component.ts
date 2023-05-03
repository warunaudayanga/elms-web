/* eslint-disable no-console */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppService } from "../../../../app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { StudentService } from "../../../../core/services/elms/student.service";
import { HttpError } from "../../../../core/interfaces";
import { ClassRoom, ClassSchedule, Role, Status } from "../../../../core/entity";
import moment from "moment";
import { nextOccurringDateTime } from "../../../../core/utils";
import { ZoomService } from "../../../../core/services/elms/zoom.service";
import { Store } from "@ngxs/store";
import { ZoomErrors } from "../../../student/enums/zoom.error.responses.enum";
import { AuthState } from "../../../../core/store";
import { ScheduleDialogComponent } from "./schedule-dialog/schedule-dialog.component";
import { TutorService } from "../../../../core/services/elms/tutor.service";
import { DialogService } from "../../../../core/modules/dialog";
import { ClassFeeMeta } from "../../../student/interfaces/student.interfaces";
import { PaymentType } from "../../../../core/enums/payment-type.enum";
import { SocketService } from "../../../../core/services/socket.service";
import { AppEvent } from "../../../../core/enums/app-event.enum";
import { ClassDialogComponent } from "../my-classes/class-dialog/class-dialog.component";
import { Subscription } from "rxjs";
import { Assessment } from "../../../../core/entity/interfaces/assessment.interface";
import { replaceItem } from "../../../../core/utils/array.utils";
import { AssessmentService } from "../../../../core/services/elms/assessment.service";
import { AssessmentSubmissionService } from "../../../../core/services/elms/assessment-submission.service";
import { AssessmentDialogComponent } from "../assessment/assessment-dialog/assessment-dialog.component";

@Component({
    selector: "app-class-info",
    templateUrl: "./class-info.component.html",
    styleUrls: ["./class-info.component.scss"],
})
export class ClassInfoComponent implements OnInit, OnDestroy {
    role: Role;

    classRoomId?: number;

    classRoom?: ClassRoom;

    loading: boolean = false;

    meetingLoading: boolean = false;

    error: boolean = false;

    isOnline: boolean = false;

    nextOccurrence?: string;

    interval?: NodeJS.Timer;

    socketSub?: Subscription;

    protected readonly Status = Status;

    protected readonly Array = Array;

    constructor(
        public app: AppService,
        private store: Store,
        private router: Router,
        private route: ActivatedRoute,
        private socketService: SocketService,
        private tutorService: TutorService,
        private studentService: StudentService,
        private assessmentService: AssessmentService,
        private assessmentSubmissionService: AssessmentSubmissionService,
        private zoomService: ZoomService,
        private dialogService: DialogService,
    ) {
        this.role = this.store.selectSnapshot(AuthState.role)!;
        this.socketSub = this.socketService
            .onMessage<ClassRoom | ClassSchedule | Assessment>([
                AppEvent.CLASS_UPDATED,
                AppEvent.SCHEDULE_UPDATED,
                AppEvent.ASSESSMENT_CREATED,
                AppEvent.ASSESSMENT_UPDATED,
            ])
            ?.subscribe(res => {
                switch (res.event) {
                    case AppEvent.CLASS_UPDATED:
                        this.classRoom = { ...this.classRoom, ...res.data } as ClassRoom;
                        break;
                    case AppEvent.SCHEDULE_UPDATED:
                        if (this.classRoom) {
                            this.classRoom.schedule = res.data as ClassSchedule;
                            this.setNextOccurrence();
                        }
                        break;
                    case AppEvent.ASSESSMENT_CREATED:
                        if (this.classRoom?.assessments) {
                            this.classRoom.assessments.push(res.data as Assessment);
                        } else if (this.classRoom) {
                            this.classRoom.assessments = [res.data as Assessment];
                        }
                        break;
                    case AppEvent.ASSESSMENT_UPDATED:
                        if (this.classRoom?.assessments) {
                            replaceItem(this.classRoom.assessments, res.data as Assessment, "id", true);
                        } else if (this.classRoom) {
                            this.classRoom.assessments = [res.data as Assessment];
                        }
                        break;
                }
            });
    }

    get service(): StudentService | TutorService {
        return this.app.isTutor ? this.tutorService : this.studentService;
    }

    get isDeactivated(): boolean {
        return this.classRoom?.status === Status.INACTIVE;
    }

    get isPending(): boolean {
        return this.classRoom?.status === Status.PENDING;
    }

    get isActive(): boolean {
        return this.classRoom?.status === Status.ACTIVE;
    }

    ngOnInit(): void {
        this.classRoomId = this.route.snapshot.params["id"];
        this.getClass();
    }

    getClass(): void {
        if (!this.classRoomId) {
            return;
        }
        this.loading = true;
        this.service.getClass(this.classRoomId).subscribe({
            next: classRoom => {
                this.loading = false;
                this.classRoom = classRoom;
                this.setNextOccurrence();
                this.interval = setInterval(() => {
                    this.setNextOccurrence();
                }, 1000);
                if (classRoom.schedule?.needZooAuthentication) {
                    const confirmation = this.dialogService.confirm(
                        "Zoom need to be authorized in order to manage some features of your classrooms. Do you want to authorize now?",
                    );
                    confirmation.subscribe(res => {
                        if (res) {
                            this.zoomService.authorize();
                        }
                    });
                }
            },
            error: (err: HttpError<ZoomErrors>) => {
                this.loading = false;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    setNextOccurrence(): void {
        if (this.classRoom?.schedule) {
            const { day, startTime, endTime } = this.classRoom.schedule;
            const { isOnline, nextOccurrence } = nextOccurringDateTime(day, startTime, endTime);
            if (isOnline) {
                this.isOnline = true;
                this.nextOccurrence = "Class is in session now";
            } else {
                this.nextOccurrence = `Next class is ${nextOccurrence.fromNow()}`;
                if (nextOccurrence.isAfter(moment().add(6, "hours"))) {
                    clearInterval(this.interval);
                }
            }
        }
    }

    async joinMeeting(): Promise<void> {
        const user = this.store.selectSnapshot(AuthState.user);
        const meetingId = this.classRoom?.schedule?.meetingId;
        const joinUrl = this.classRoom?.schedule?.joinUrl;
        if (meetingId && joinUrl) {
            this.meetingLoading = true;
            if (this.app.isTutor) {
                await this.zoomService.startMeeting(user!.name, meetingId, joinUrl);
            } else {
                await this.zoomService.joinMeeting(user!.name, meetingId, joinUrl);
            }
            this.meetingLoading = false;
        }
    }

    pay(): void {
        const dialogRef = this.dialogService.payment<number, ClassFeeMeta>({
            amount: this.classRoom!.payment * 100,
            metadata: {
                type: PaymentType.CLASS_FEE,
                classRoomId: this.classRoom!.id,
                fromDate: moment().startOf("month").format("YYYY-MM-DD"),
                toDate: moment().endOf("month").format("YYYY-MM-DD"),
            },
        });
        dialogRef.subscribe(transactionId => {
            if (transactionId) {
                console.log(transactionId);
                this.classRoom!.isPaid = true; // TODO: use websocket to update this
            }
        });
    }

    showUpdateClassDialog(): void {
        const res = this.dialogService.open<ClassRoom, ClassRoom>(ClassDialogComponent, {
            data: {
                data: this.classRoom,
                wait: true,
            },
            width: "400px",
            disableClose: true,
            panelClass: ["dialog-container", "primary"],
            maxWidth: "400px",
        });
        res.subscribe(classRoom => {
            if (classRoom) {
                this.classRoom = { ...this.classRoom, ...classRoom };
            }
        });
    }

    showScheduleDialog(): void {
        const res = this.dialogService.open<ClassSchedule, { classRoomId: number; schedule?: ClassSchedule }>(ScheduleDialogComponent, {
            data: {
                data: {
                    classRoomId: this.classRoomId!,
                    schedule: this.classRoom!.schedule,
                },
            },
            width: "400px",
            disableClose: true,
            panelClass: ["dialog-container", "primary"],
            maxWidth: "400px",
        });
        res.subscribe(schedule => {
            if (schedule) {
                this.classRoom!.schedule = schedule;
                this.setNextOccurrence();
            }
        });
    }

    showAssessmentDialog(assessment?: Assessment): void {
        const res = this.dialogService.open<Assessment, { classRoomId: number; assessment?: Assessment }>(AssessmentDialogComponent, {
            data: {
                data: {
                    classRoomId: this.classRoomId!,
                    assessment,
                },
            },
            width: "85vw",
            minWidth: "85vw",
            maxWidth: "500px",
            disableClose: true,
            panelClass: ["dialog-container", "primary"],
        });
        res.subscribe(assessment => {
            if (assessment) {
                if (this.classRoom?.assessments) {
                    replaceItem(this.classRoom.assessments, assessment, "id", true);
                } else {
                    this.classRoom!.assessments = [assessment];
                }
                this.setNextOccurrence();
            }
        });
    }

    ngOnDestroy(): void {
        this.socketSub?.unsubscribe();
    }

    protected readonly Number = Number;
}
