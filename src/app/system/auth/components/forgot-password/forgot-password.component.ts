import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../../../../app.service";
import { Store } from "@ngxs/store";
import { AuthService } from "../../../../core/services";
import { markDirty } from "../../../../core/modules/ng-control/utils/form-group.utils";
import { HttpError } from "../../../../core/interfaces";
import { AuthError } from "../../enums";

@Component({
    selector: "app-forgot-password",
    templateUrl: "./forgot-password.component.html",
    styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordForm?: FormGroup;

    loading: boolean = false;

    constructor(private app: AppService, private store: Store, private fb: FormBuilder, private authService: AuthService) {}

    ngOnInit(): void {
        this.forgotPasswordForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
        });
    }

    resetRequest(): void {
        if (this.forgotPasswordForm?.invalid) {
            markDirty(this.forgotPasswordForm);
        }
        this.loading = true;
        this.authService.requestPasswordReset(this.forgotPasswordForm?.value.email).subscribe({
            next: () => {
                this.loading = false;
                this.app.success("Password reset mail has been sent tou your email address. Please check your inbox.");
            },
            error: (err: HttpError<AuthError>) => {
                this.loading = false;
                this.app.error(err.error?.message ?? "Something went wrong");
            },
        });
    }
}
