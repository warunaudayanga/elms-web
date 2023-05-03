import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../../../../app.service";
import { AuthService } from "../../../../core/services";
import { HttpError } from "../../../../core/interfaces";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { markDirty } from "../../../../core/modules/ng-control/utils/form-group.utils";
import { AuthError } from "../../enums";

@Component({
    selector: "app-account-verification",
    templateUrl: "./account-verification.component.html",
    styleUrls: ["./account-verification.component.scss"],
})
export class AccountVerificationComponent implements OnInit {
    verified = false;

    resendVerificationPrompt: boolean = false;

    loading: boolean = true;

    resendLoading: boolean = false;

    emailSent: boolean = false;

    error?: string;

    resendForm?: FormGroup;

    constructor(
        private readonly app: AppService,
        private readonly route: ActivatedRoute,
        private readonly authService: AuthService,
        private readonly fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.resendForm = this.fb.group({
            email: ["", [Validators.required, Validators.email]],
        });
        if (this.route.snapshot.url.find(s => s.path === "resend")) {
            this.loading = false;
            this.resendVerificationPrompt = true;
        } else {
            const token = this.route.snapshot.params["token"];
            this.verifyAccount(token);
        }
    }

    verifyAccount(token: string): void {
        if (token) {
            this.authService.verifyAccount(token).subscribe({
                next: () => {
                    this.verified = true;
                    this.loading = false;
                },
                error: () => {
                    this.loading = false;
                    this.error = "This verification link is invalid or expired";
                },
            });
        } else {
            this.app.load("/");
        }
    }

    showResendVerificationPrompt(): void {
        this.error = undefined;
        this.resendVerificationPrompt = true;
    }

    resendVerificationEmail(): void {
        if (this.resendForm!.invalid) {
            markDirty(this.resendForm!);
            return;
        }
        this.resendLoading = true;
        this.authService.resendVerification(this.resendForm!.value.email).subscribe({
            next: () => {
                this.resendLoading = false;
                this.resendVerificationPrompt = false;
                this.emailSent = true;
                this.app.success("Verification email has been sent");
            },
            error: (err: HttpError<AuthError>) => {
                this.resendLoading = false;
                switch (err.error?.code) {
                    case AuthError.AUTH_400_ALREADY_VERIFIED:
                        this.app.error("This account is already verified");
                        return;
                    case AuthError.AUTH_400_ACCOUNT_DISABLED:
                        this.resendVerificationPrompt = false;
                        this.app.error("This account is disabled, please contact a administrator");
                        return;
                }
                this.app.error(err.error?.message ?? "Something went wrong");
            },
        });
    }
}
