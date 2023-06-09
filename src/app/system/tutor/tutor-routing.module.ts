import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ZoomAuthorizeViewComponent } from "./components/zoom-authorize-view/zoom-authorize-view.component";
import { ClassInfoComponent } from "../shared/components/class-info/class-info.component";
import { MyClassesComponent } from "../shared/components/my-classes/my-classes.component";
import { AssessmentComponent } from "../shared/components/assessment/assessment.component";
import { SubmissionsComponent } from "./components/submissions/submissions.component";
import { SubmissionDialogComponent } from "./components/submission-dialog/submission-dialog.component";

const routes: Routes = [
    { path: "my-classes", component: MyClassesComponent },
    { path: "my-classes/:id", component: ClassInfoComponent },
    { path: "my-classes/assessment/:id", component: AssessmentComponent },
    { path: "my-classes/submissions/:assessmentId", component: SubmissionsComponent },
    { path: "my-classes/submission/:id", component: SubmissionDialogComponent },
    { path: "zoom-authorize", component: ZoomAuthorizeViewComponent },
    { path: "zoom-authorize/:code", component: ZoomAuthorizeViewComponent },
    { path: "", redirectTo: "my-classes", pathMatch: "full" },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TutorRoutingModule {}
