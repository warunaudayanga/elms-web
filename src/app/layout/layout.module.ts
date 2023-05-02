import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomepageLayoutComponent } from "./homepage-layout/homepage-layout.component";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { StudentLayoutComponent } from "./student-layout/student-layout.component";
import { TutorLayoutComponent } from "./tutor-layout/tutor-layout.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../core/modules/shared/shared.module";
import { AuthLeftComponent } from "./auth-layout/auth-left/auth-left.component";
import { SideMenuComponent } from "./shared/side-menu/side-menu.component";
import { AdminHeaderComponent } from "./admin-layout/admin-header/admin-header.component";
import { AdminSideMenuComponent } from "./admin-layout/admin-side-menu/admin-side-menu.component";
import { AdminFooterComponent } from "./admin-layout/admin-footer/admin-footer.component";
import { StudentSideMenuComponent } from "./student-layout/student-side-menu/student-side-menu.component";
import { StudentHeaderComponent } from "./student-layout/student-header/student-header.component";
import { StudentFooterComponent } from "./student-layout/student-footer/student-footer.component";
import { TutorHeaderComponent } from "./tutor-layout/tutor-header/tutor-header.component";
import { TutorSideMenuComponent } from "./tutor-layout/tutor-side-menu/tutor-side-menu.component";
import { TutorFooterComponent } from "./tutor-layout/tutor-footer/tutor-footer.component";

@NgModule({
    declarations: [
        HomepageLayoutComponent,
        AuthLayoutComponent,
        AuthLeftComponent,
        AuthLayoutComponent,
        AdminLayoutComponent,
        AdminHeaderComponent,
        AdminSideMenuComponent,
        AdminFooterComponent,
        TutorLayoutComponent,
        TutorHeaderComponent,
        TutorSideMenuComponent,
        TutorFooterComponent,
        StudentLayoutComponent,
        SideMenuComponent,
        StudentHeaderComponent,
        StudentSideMenuComponent,
        StudentFooterComponent,
    ],
    imports: [CommonModule, SharedModule, RouterModule],
})
export class LayoutModule {}
