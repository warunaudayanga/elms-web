import { Component, OnInit } from "@angular/core";
import { Grade, Status } from "../../../../core/entity";
import { GradeService } from "../../../../core/services/elms/grade.service";
import { HttpError } from "../../../../core/interfaces";
import { AppService } from "../../../../app.service";
import { DialogService } from "../../../../core/modules/dialog";
import { GradeDialogComponent } from "./grade-dialog/grade-dialog.component";
import { replaceItem } from "../../../../core/utils/array.utils";

@Component({
    selector: "app-grades",
    templateUrl: "./grades.component.html",
    styleUrls: ["./grades.component.scss"],
})
export class GradesComponent implements OnInit {
    grades: Grade[] = [];

    loading: boolean = false;

    error: boolean = false;

    Status = Status;

    constructor(private readonly app: AppService, private readonly dialogService: DialogService, private readonly gradeService: GradeService) {}

    ngOnInit(): void {
        this.getGrades();
    }

    getGrades(): void {
        this.loading = true;
        this.error = false;
        this.gradeService.getAll().subscribe({
            next: grades => {
                this.loading = false;
                this.grades = grades;
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
            const confirmation = this.dialogService.confirm("Are you sure you want to deactivate this grade?", {
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
        const grade = this.grades!.find(c => c.id === id)!;
        const prevStatus = grade?.status;
        grade.status = status;
        this.gradeService.updateStatus(id, status).subscribe({
            next: () => {
                this.app.success("Tutor updated successfully!");
            },
            error: err => {
                this.loading = false;
                this.error = true;
                grade.status = prevStatus;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    showGradeDialog(grade?: Grade): void {
        const res = this.dialogService.open<Grade, Grade>(GradeDialogComponent, {
            data: {
                data: grade,
            },
            width: "400px",
            disableClose: true,
            panelClass: ["dialog-container", "primary"],
            maxWidth: "400px",
        });
        res.subscribe(grade => {
            if (grade) {
                replaceItem(this.grades, grade, "id");
            }
        });
    }
}
