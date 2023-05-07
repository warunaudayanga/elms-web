import { Component, OnInit } from "@angular/core";
import { ClassSubject, Status } from "../../../../core/entity";
import { AppService } from "../../../../app.service";
import { DialogService } from "../../../../core/modules/dialog";
import { ClassSubjectService } from "../../../../core/services/elms/subject.service";
import { HttpError } from "../../../../core/interfaces";
import { replaceItem } from "../../../../core/utils/array.utils";
import { SubjectDialogComponent } from "./subject-dialog/subject-dialog.component";

@Component({
    selector: "app-subjects",
    templateUrl: "./subjects.component.html",
    styleUrls: ["./subjects.component.scss"],
})
export class SubjectsComponent implements OnInit {
    subjects: ClassSubject[] = [];

    loading: boolean = false;

    error: boolean = false;

    Status = Status;

    constructor(
        private readonly app: AppService,
        private readonly dialogService: DialogService,
        private readonly subjectService: ClassSubjectService,
    ) {}

    ngOnInit(): void {
        this.getSubjects();
    }

    getSubjects(): void {
        this.loading = true;
        this.error = false;
        this.subjectService.getAll().subscribe({
            next: subjects => {
                this.loading = false;
                this.subjects = subjects;
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    changeStatusPrompt(id: number, status: Status): void {
        if (status === Status.INACTIVE) {
            const confirmation = this.dialogService.confirm("Are you sure you want to deactivate this subject?", {
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
        const subject = this.subjects!.find(c => c.id === id)!;
        const prevStatus = subject?.status;
        subject.status = status;
        this.subjectService.updateStatus(id, status).subscribe({
            next: () => {
                this.app.success("Tutor updated successfully!");
            },
            error: err => {
                this.loading = false;
                this.error = true;
                subject.status = prevStatus;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    showSubjectDialog(subject?: ClassSubject): void {
        const res = this.dialogService.open<ClassSubject, ClassSubject>(SubjectDialogComponent, {
            data: {
                data: subject,
            },
            width: "400px",
            disableClose: true,
            panelClass: ["dialog-container", "primary"],
            maxWidth: "400px",
        });
        res.subscribe(subject => {
            if (subject) {
                replaceItem(this.subjects, subject, "id");
            }
        });
    }
}
