import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./layout/admin-layout/admin-layout.component";
import { HomepageLayoutComponent } from "./layout/homepage-layout/homepage-layout.component";
import { TutorLayoutComponent } from "./layout/tutor-layout/tutor-layout.component";
import { StudentLayoutComponent } from "./layout/student-layout/student-layout.component";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { Role } from "./core/entity";
import { AuthGuard } from "./system/auth/guards";

const routes: Routes = [
    {
        path: "",
        component: HomepageLayoutComponent,
        loadChildren: () => import("./system/homepage/homepage.module").then(m => m.HomepageModule),
        canActivate: [AuthGuard],
    },
    {
        path: "auth",
        component: AuthLayoutComponent,
        loadChildren: () => import("./system/auth/auth.module").then(m => m.AuthModule),
        canActivate: [AuthGuard],
    },
    {
        path: "admin",
        component: AdminLayoutComponent,
        loadChildren: () => import("./system/admin/admin.module").then(m => m.AdminModule),
        canActivate: [AuthGuard],
        data: {
            roles: [Role.SUPER_ADMIN, Role.ADMIN],
        },
    },
    {
        path: "tutor",
        component: TutorLayoutComponent,
        loadChildren: () => import("./system/tutor/tutor.module").then(m => m.TutorModule),
        canActivate: [AuthGuard],
        data: {
            roles: [Role.TUTOR],
        },
    },
    {
        path: "student",
        component: StudentLayoutComponent,
        loadChildren: () => import("./system/student/student.module").then(m => m.StudentModule),
        canActivate: [AuthGuard],
        data: {
            roles: [Role.STUDENT],
        },
    },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
