import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StudentRoutingModule } from "./student-routing.module";
import { StudentHomeComponent } from "./components/student-home/student-home.component";
import { SharedModule } from "../../core/modules/shared/shared.module";
import { MyClassesComponent } from "../shared/components/my-classes/my-classes.component";
import { FindClassComponent } from "./components/find-class/find-class.component";
import { MomentModule } from "ngx-moment";
import { NgControlModule } from "../../core/modules/ng-control";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from "../../core/modules/dialog";
import { EnrollClassDialogComponent } from "./components/find-class/enroll-class-dialog/enroll-class-dialog.component";
import { PipeModule } from "../../core/modules/pipe/pipe.module";
import { ClassInfoComponent } from "../shared/components/class-info/class-info.component";
import { NgxStripeModule } from "ngx-stripe";

@NgModule({
    declarations: [StudentHomeComponent, MyClassesComponent, FindClassComponent, EnrollClassDialogComponent, ClassInfoComponent],
    imports: [
        CommonModule,
        StudentRoutingModule,
        SharedModule,
        MomentModule,
        NgControlModule,
        FormsModule,
        DialogModule,
        PipeModule,
        NgxStripeModule,
        ReactiveFormsModule,
    ],
})
export class StudentModule {}
