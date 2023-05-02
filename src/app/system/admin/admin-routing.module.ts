import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminClassesComponent } from "./components/admin-classes/admin-classes.component";
import { AdminTutorsComponent } from "./components/admin-tutors/admin-tutors.component";
import { AdminStudentsComponent } from "./components/admin-students/admin-students.component";
import { GradesComponent } from "./components/grades/grades.component";
import { SubjectsComponent } from "./components/subjects/subjects.component";

const routes: Routes = [
    { path: "classes", component: AdminClassesComponent },
    { path: "tutors", component: AdminTutorsComponent },
    { path: "students", component: AdminStudentsComponent },
    { path: "grades", component: GradesComponent },
    { path: "subjects", component: SubjectsComponent },
    { path: "", redirectTo: "classes", pathMatch: "full" },
    { path: "**", redirectTo: "classes", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
