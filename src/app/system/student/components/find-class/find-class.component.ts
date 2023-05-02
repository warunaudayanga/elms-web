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
import { DialogService } from "../../../../core/modules/dialog";
import { EnrollClassDialogComponent } from "./enroll-class-dialog/enroll-class-dialog.component";
import { ClassStudent } from "../../../../core/entity/interfaces/class-student.interface";
import { PaginatorInterfaces } from "../../../../core/modules/shared/interfaces/paginator.interfaces";
import { DataViewRefreshEvent } from "../../../../core/modules/shared/interfaces/data-view.interfaces";
import { SocketService } from "../../../../core/services/socket.service";
import { AppEvent } from "../../../../core/enums/app-event.enum";
import { replaceItem } from "../../../../core/utils/array.utils";

@Component({
    selector: "app-find-class",
    templateUrl: "./find-class.component.html",
    styleUrls: ["./find-class.component.scss"],
})
export class FindClassComponent implements OnInit, OnDestroy {
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
        private app: AppService,
        private socketService: SocketService,
        private classRoomService: ClassRoomService,
        private gradeService: GradeService,
        private subjectService: ClassSubjectService,
        private userService: UserService,
        private dialogService: DialogService,
    ) {
        this.eventSub = this.socketService
            .onMessage<ClassRoom | ClassSchedule>([
                AppEvent.CLASS_CREATED,
                AppEvent.CLASS_UPDATED,
                AppEvent.SCHEDULE_UPDATED,
            ])
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

    async ngOnInit(): Promise<void> {
        await this.getData();
        this.getAllClasses();
    }

    getData(): Promise<void> {
        this.loading = true;
        return Promise.all([
            firstValueFrom(this.gradeService.getAll()),
            firstValueFrom(this.subjectService.getAll()),
            firstValueFrom(this.userService.getAllTutors()),
        ])
            .then(([grades, subjects, tutors]) => {
                this.grades = grades;
                this.subjects = subjects;
                this.tutors = tutors;
            })
            .catch((err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message ?? "Error occurred!");
            });
    }

    getAllClasses(): void {
        this.loading = true;
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
        this.classRoomService.getAll(entityFilters).subscribe({
            next: classes => {
                this.loading = false;
                this.error = false;
                this.classes = classes.data;
                this.totalRecords = classes.rowCount;
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message ?? "Error occurred!");
            },
        });
    }

    joinClass(classRoom: ClassRoom): void {
        const res = this.dialogService.open<ClassStudent>(EnrollClassDialogComponent, {
            data: {
                data: classRoom,
                wait: true,
            },
            width: "400px",
            disableClose: true,
            panelClass: ["dialog-container", "primary"],
            maxWidth: "400px",
        });
        res.subscribe(clasStudent => {
            if (clasStudent) {
                this.classes.find(clas => clas.id === clasStudent.classRoomId)!.classStudents!.push(clasStudent);
            }
        });
    }

    paginate(e: PaginatorInterfaces): void {
        this.page = e.page;
        this.getAllClasses();
    }

    refresh(event: DataViewRefreshEvent): void {
        this.page = event.page;
        this.getAllClasses();
    }

    ngOnDestroy(): void {
        this.eventSub?.unsubscribe();
    }
}
