import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterComponent } from "./components/register/register.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { AuthState } from "../../core/store";
import { NgxsModule } from "@ngxs/store";
import { NgControlModule } from "../../core/modules/ng-control";
import { SharedModule } from "../../core/modules/shared/shared.module";
import { TutorRegisterInfoComponent } from "./components/tutor-register-info/tutor-register-info.component";
import { AccountVerificationComponent } from "./components/account-verification/account-verification.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        TutorRegisterInfoComponent,
        AccountVerificationComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
    ],
    imports: [CommonModule, NgxsModule.forFeature([AuthState]), AuthRoutingModule, ReactiveFormsModule, NgControlModule, FormsModule, SharedModule],
})
export class AuthModule {}
