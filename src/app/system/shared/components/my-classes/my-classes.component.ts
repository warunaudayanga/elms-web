import { Component, OnDestroy, OnInit } from "@angular/core";
import { ClassRoomService } from "../../../../core/services/elms/class-room.service";
import { ClassRoom, ClassSchedule, ClassSubject, Grade, Tutor } from "../../../../core/entity";
import { SortFields } from "../../../../core/entity/types/entity.types";
import { HttpError } from "../../../../core/interfaces";
import { AppService } from "../../../../app.service";
import { PagedEntityFilters } from "../../../../core/entity/interfaces/entity.interfaces";
import { firstValueFrom, Subscription } from "rxjs";
import { GradeService } from "../../../../core/services/elms/grade.service";
import { ClassSubjectService } from "../../../../core/services/elms/subject.service";
import { UserService } from "../../../../core/services/elms/user.service";
import { StudentService } from "../../../../core/services/elms/student.service";
import { PaginatorInterfaces } from "../../../../core/modules/shared/interfaces/paginator.interfaces";
import { DataViewRefreshEvent } from "../../../../core/modules/shared/interfaces/data-view.interfaces";
import { TutorService } from "../../../../core/services/elms/tutor.service";
import { ClassDialogComponent } from "./class-dialog/class-dialog.component";
import { DialogService } from "../../../../core/modules/dialog";
import { AppEvent } from "../../../../core/enums/app-event.enum";
import { SocketService } from "../../../../core/services/socket.service";
import { replaceItem } from "../../../../core/utils/array.utils";
import { ZoomService } from "../../../../core/services/elms/zoom.service";

@Component({
    selector: "app-my-classes",
    templateUrl: "./my-classes.component.html",
    styleUrls: ["./my-classes.component.scss"],
})
export class MyClassesComponent implements OnInit, OnDestroy {
    classes: ClassRoom[] = [];

    grades: Grade[] = [];

    subjects: ClassSubject[] = [];

    tutors: Tutor[] = [];

    totalRecords: number = 0;

    page: number = 1;

    limit: number = 10;

    gradeId?: number;

    subjectId?: number;

    tutorId?: number;

    sort?: SortFields<ClassRoom> = {
        name: "ASC",
    };

    loading: boolean = false;

    error: boolean = false;

    eventSub?: Subscription;

    constructor(
        public readonly app: AppService,
        private readonly socketService: SocketService,
        private readonly classRoomService: ClassRoomService,
        private readonly tutorService: TutorService,
        private readonly studentService: StudentService,
        private readonly gradeService: GradeService,
        private readonly subjectService: ClassSubjectService,
        private readonly userService: UserService,
        private readonly dialogService: DialogService,
        private readonly zoomService: ZoomService,
    ) {
        this.eventSub = this.socketService
            .onMessage<ClassRoom | ClassSchedule>([AppEvent.CLASS_CREATED, AppEvent.CLASS_UPDATED, AppEvent.SCHEDULE_UPDATED])
            ?.subscribe(res => {
                switch (res.event) {
                    case AppEvent.CLASS_CREATED:
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
            });
    }

    get service(): TutorService | StudentService {
        return this.app.isTutor ? this.tutorService : this.studentService;
    }

    async ngOnInit(): Promise<void> {
        await this.getData();
        this.getMyClasses();
    }

    async getData(): Promise<void> {
        try {
            this.loading = true;
            this.grades = await firstValueFrom(this.gradeService.getAll());
            this.subjects = await firstValueFrom(this.subjectService.getAll());
            if (!this.app.isTutor) this.tutors = await firstValueFrom(this.userService.getAllTutors());
            this.error = false;
        } catch (err) {
            this.loading = false;
            this.error = true;
            this.app.error((err as HttpError)?.error?.message ?? "Error occurred!");
        }
    }

    getMyClasses(): void {
        this.loading = true;
        this.error = false;
        const entityFilters: PagedEntityFilters<ClassRoom> = {
            filters: {
                gradeId: this.gradeId,
                subjectId: this.subjectId,
                tutorId: this.tutorId,
            },
            sort: this.sort,
            pagination: {
                page: this.page,
                limit: this.limit,
            },
        };
        this.service.getMyClasses(entityFilters).subscribe({
            next: res => {
                this.loading = false;
                this.classes = res.data;
                this.totalRecords = res.rowCount;
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message ?? "Error occurred!");
            },
        });
    }

    showCreateClassDialog(): void {
        const res = this.dialogService.open<ClassRoom>(ClassDialogComponent, {
            data: {
                wait: true,
            },
            width: "400px",
            disableClose: true,
            panelClass: ["dialog-container", "primary"],
            maxWidth: "400px",
        });
        res.subscribe(classRoom => {
            if (classRoom) {
                this.classes.push(classRoom);
            }
        });
    }

    async joinOrStartMeeting(classRoom: ClassRoom): Promise<void> {
        if (classRoom.schedule?.meetingId && classRoom.schedule?.joinUrl) {
            if (this.app.isTutor) {
                await this.zoomService.startMeeting(
                    classRoom.id,
                    this.app.user!.name ?? "",
                    classRoom.schedule?.meetingId,
                    classRoom.schedule?.joinUrl,
                );
            } else {
                await this.zoomService.joinMeeting(this.app.user!.name ?? "", classRoom.schedule?.meetingId, classRoom.schedule?.joinUrl);
            }
        }
    }

    paginate(e: PaginatorInterfaces): void {
        this.page = e.page;
        this.getMyClasses();
    }

    refresh(event: DataViewRefreshEvent): void {
        this.page = event.page;
        this.getMyClasses();
    }

    ngOnDestroy(): void {
        this.eventSub?.unsubscribe();
    }

    view(classRoom: ClassRoom): void {
        this.app.load([this.app.isTutor ? "tutor" : "student", "my-classes", classRoom.id]);
    }
}
