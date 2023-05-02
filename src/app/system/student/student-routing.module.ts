import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyClassesComponent } from "../shared/components/my-classes/my-classes.component";
import { FindClassComponent } from "./components/find-class/find-class.component";
import { ClassInfoComponent } from "../shared/components/class-info/class-info.component";
import { AssessmentComponent } from "../shared/components/assessment/assessment.component";

const routes: Routes = [
    { path: "my-classes", component: MyClassesComponent },
    { path: "my-classes/:id", component: ClassInfoComponent },
    { path: "my-classes/assessment/:id", component: AssessmentComponent },
    { path: "my-classes/:id/:code", component: ClassInfoComponent },
    { path: "find-class", component: FindClassComponent },
    { path: "", redirectTo: "my-classes", pathMatch: "full" },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule {}
