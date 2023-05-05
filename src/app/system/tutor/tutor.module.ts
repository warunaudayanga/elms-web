import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TutorRoutingModule } from "./tutor-routing.module";
import { TutorHomeComponent } from "./components/tutor-home/tutor-home.component";
import { NgControlModule } from "../../core/modules/ng-control";
import { SharedModule } from "../../core/modules/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PipeModule } from "../../core/modules/pipe/pipe.module";
import { ClassDialogComponent } from "../shared/components/my-classes/class-dialog/class-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { ScheduleDialogComponent } from "../shared/components/class-info/schedule-dialog/schedule-dialog.component";
import { ZoomModule } from "../../core/modules/zoom/zoom.module";
import { ZoomAuthorizeViewComponent } from "./components/zoom-authorize-view/zoom-authorize-view.component";
import { SubmissionsComponent } from "./components/submissions/submissions.component";
import { SubmissionDialogComponent } from "./components/submission-dialog/submission-dialog.component";

@NgModule({
    declarations: [
        TutorHomeComponent,
        ClassDialogComponent,
        ScheduleDialogComponent,
        ZoomAuthorizeViewComponent,
        SubmissionsComponent,
        SubmissionDialogComponent,
    ],
    imports: [
        CommonModule,
        TutorRoutingModule,
        NgControlModule,
        SharedModule,
        FormsModule,
        PipeModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatDividerModule,
        ZoomModule,
    ],
})
export class TutorModule {}
