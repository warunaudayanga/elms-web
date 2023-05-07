import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminClassesComponent } from "./components/admin-classes/admin-classes.component";
import { NgControlModule } from "../../core/modules/ng-control";
import { SharedModule } from "../../core/modules/shared/shared.module";
import { PipeModule } from "../../core/modules/pipe/pipe.module";
import { AdminClassCardComponent } from "./components/admin-classes/admin-class-card/admin-class-card.component";
import { AdminTutorsComponent } from "./components/admin-tutors/admin-tutors.component";
import { AdminTutorCardComponent } from "./components/admin-tutors/admin-tutor-card/admin-tutor-card.component";
import { TutorDialogComponent } from "./components/admin-tutors/tutor-dialog/tutor-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminStudentsComponent } from "./components/admin-students/admin-students.component";
import { AdminStudentCardComponent } from "./components/admin-students/admin-student-card/admin-student-card.component";
import { SubjectsComponent } from "./components/subjects/subjects.component";
import { GradesComponent } from "./components/grades/grades.component";
import { GradeDialogComponent } from "./components/grades/grade-dialog/grade-dialog.component";
import { SubjectDialogComponent } from "./components/subjects/subject-dialog/subject-dialog.component";

@NgModule({
    declarations: [
        AdminClassesComponent,
        AdminClassCardComponent,
        AdminTutorsComponent,
        AdminTutorCardComponent,
        TutorDialogComponent,
        AdminStudentsComponent,
        AdminStudentCardComponent,
        SubjectsComponent,
        GradesComponent,
        GradeDialogComponent,
        SubjectDialogComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NgControlModule,
        SharedModule,
        PipeModule,
        MatDialogModule,
        MatDividerModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class AdminModule {}
