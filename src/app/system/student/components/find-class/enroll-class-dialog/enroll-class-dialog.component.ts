import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ClassRoom } from "../../../../../core/entity";
import { DialogConfig } from "../../../../../core/modules/dialog/interfaces";
import { StudentService } from "../../../../../core/services/elms/student.service";
import { HttpError } from "../../../../../core/interfaces";
import { AppService } from "../../../../../app.service";
import { ClassStudent } from "../../../../../core/entity/interfaces/class-student.interface";

@Component({
    selector: "app-enroll-class-dialog",
    templateUrl: "./enroll-class-dialog.component.html",
    styleUrls: ["./enroll-class-dialog.component.scss"],
})
export class EnrollClassDialogComponent {
    classRoom: ClassRoom = this.data.data!;

    loading: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: DialogConfig<ClassRoom>,
        private readonly dialogRef: MatDialogRef<EnrollClassDialogComponent, ClassStudent>,
        private readonly app: AppService,
        private readonly studentService: StudentService,
    ) {}

    close(): void {
        this.dialogRef.close();
    }

    enroll(): void {
        this.loading = true;
        this.studentService.enrollClass(this.classRoom.id).subscribe({
            next: clasStudent => {
                this.loading = false;
                this.app.success("You have successfully enrolled in this class!");
                this.dialogRef.close(clasStudent);
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.app.error(err.error?.message || "Failed to Login!");
            },
        });
    }
}
