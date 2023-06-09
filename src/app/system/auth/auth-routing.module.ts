import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { TutorRegisterInfoComponent } from "./components/tutor-register-info/tutor-register-info.component";
import { AccountVerificationComponent } from "./components/account-verification/account-verification.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "verify/resend", component: AccountVerificationComponent },
    { path: "verify/:token", component: AccountVerificationComponent },
    { path: "forgot-password", component: ForgotPasswordComponent },
    { path: "reset-password/:token", component: ResetPasswordComponent },
    { path: "tutor", component: TutorRegisterInfoComponent },
    { path: "forgot-password", component: RegisterComponent },
    { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
