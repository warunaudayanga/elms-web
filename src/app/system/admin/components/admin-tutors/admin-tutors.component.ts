import { Component, OnInit } from "@angular/core";
import { Role, Status, User } from "../../../../core/entity";
import { AppService } from "../../../../app.service";
import { DialogService } from "../../../../core/modules/dialog";
import { PaginatorInterfaces } from "../../../../core/modules/shared/interfaces/paginator.interfaces";
import { DataViewRefreshEvent } from "../../../../core/modules/shared/interfaces/data-view.interfaces";
import { PagedEntityFilters } from "../../../../core/entity/interfaces/entity.interfaces";
import { UserService } from "../../../../core/services/elms/user.service";
import { TutorDialogComponent } from "./tutor-dialog/tutor-dialog.component";

@Component({
    selector: "app-admin-tutors",
    templateUrl: "./admin-tutors.component.html",
    styleUrls: ["./admin-tutors.component.scss"],
})
export class AdminTutorsComponent implements OnInit {
    loading: boolean = false;

    error: boolean = false;

    tutors: User[] = [];

    page: number = 1;

    limit: number = 10;

    totalRecords: number = 0;

    constructor(
        private readonly app: AppService,
        private dialogService: DialogService,
        private readonly userService: UserService,
    ) {}

    ngOnInit(): void {
        this.getTutors();
    }

    paginate(e: PaginatorInterfaces): void {
        this.page = e.page;
        this.getTutors();
    }

    refresh(event: DataViewRefreshEvent): void {
        this.page = event.page;
        this.getTutors();
    }

    getTutors(): void {
        this.loading = true;
        this.error = false;
        const entityFilters: PagedEntityFilters<User> = {
            filters: {
                role: Role.TUTOR,
            },
            pagination: {
                page: this.page,
                limit: this.limit,
            },
        };
        this.userService.getAll(entityFilters).subscribe({
            next: res => {
                this.loading = false;
                this.tutors = res.data;
                this.totalRecords = res.rowCount;
                this.tutors.sort(a => (a.status === Status.PENDING ? -1 : 1));
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
            const confirmation = this.dialogService.confirm("Are you sure you want to deactivate this tutor?", {
                ok: "Deactivate",
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
        const tutor = this.tutors!.find(c => c.id === id)!;
        const prevStatus = tutor?.status;
        tutor.status = status;
        this.userService.updateStatus(id, status).subscribe({
            next: () => {
                this.app.success("Tutor updated successfully!");
            },
            error: err => {
                this.loading = false;
                this.error = true;
                tutor.status = prevStatus;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    createTutorDialog(tutor?: User): void {
        const res = this.dialogService.open<User, User>(TutorDialogComponent, {
            data: {
                data: tutor,
            },
            width: "400px",
            disableClose: true,
            panelClass: ["dialog-container", "primary"],
            maxWidth: "400px",
        });
        res.subscribe(user => {
            if (user) {
                this.tutors.push(user);
            }
        });
    }
}
