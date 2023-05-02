import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogConfig } from "../../../../../core/modules/dialog/interfaces";
import { AppService } from "../../../../../app.service";
import { TutorService } from "../../../../../core/services/elms/tutor.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClassRoom, ClassSubject, Grade } from "../../../../../core/entity";
import { firstValueFrom } from "rxjs";
import { HttpError } from "../../../../../core/interfaces";
import { GradeService } from "../../../../../core/services/elms/grade.service";
import { ClassSubjectService } from "../../../../../core/services/elms/subject.service";

@Component({
    selector: "app-class-dialog",
    templateUrl: "./class-dialog.component.html",
    styleUrls: ["./class-dialog.component.scss"],
})
export class ClassDialogComponent implements OnInit {
    classForm: FormGroup;

    loading: boolean = false;

    error: boolean = false;

    grades: Grade[] = [];

    subjects: ClassSubject[] = [];

    generatedName: string = `${this.config.data?.grade?.name ?? ""} ${this.config.data?.subject?.name ?? ""}`;

    constructor(
        @Inject(MAT_DIALOG_DATA) public config: DialogConfig<ClassRoom>,
        private readonly dialogRef: MatDialogRef<ClassDialogComponent, ClassRoom>,
        private readonly app: AppService,
        private readonly fb: FormBuilder,
        private gradeService: GradeService,
        private subjectService: ClassSubjectService,
        private readonly tutorService: TutorService,
    ) {
        this.classForm = this.fb.group({
            name: [this.config.data?.name ?? "", Validators.required],
            description: [this.config.data?.description ?? ""],
            payment: [Number(this.config.data?.payment) ?? 0, Validators.required],
            gradeId: [this.config.data?.gradeId, Validators.required],
            subjectId: [this.config.data?.subjectId, Validators.required],
        });
    }

    async ngOnInit(): Promise<void> {
        await this.getData();
    }

    getData(): Promise<void> {
        this.loading = true;
        return Promise.all([firstValueFrom(this.gradeService.getAll()), firstValueFrom(this.subjectService.getAll())])
            .then(([grades, subjects]) => {
                this.grades = grades;
                this.subjects = subjects;
                this.loading = false;
            })
            .catch((err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message ?? "Error occurred!");
            });
    }

    close(): void {
        this.dialogRef.close();
    }

    saveClass(): void {
        if (this.classForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = false;
        (this.config.data
            ? this.tutorService.updateClass(this.config.data!.id, this.classForm.value)
            : this.tutorService.createClass(this.classForm.value)
        ).subscribe({
            next: classRoom => {
                this.loading = false;
                this.app.success("Class created successfully.");
                this.dialogRef.close(classRoom);
            },
            error: (err: HttpError) => {
                this.loading = false;
                this.error = true;
                this.app.error(err.error?.message ?? "Something went wrong!");
            },
        });
    }

    generateName(): void {
        if (this.classForm.value.gradeId && this.classForm.value.subjectId) {
            const grade = this.grades.find(grade => grade.id === this.classForm.value.gradeId)!.name;
            const subject = this.subjects.find(subject => subject.id === this.classForm.value.subjectId)!.name;
            this.generatedName = `${grade} ${subject}`;
        }
    }
}
