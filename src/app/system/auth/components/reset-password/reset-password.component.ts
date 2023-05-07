import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppService } from "../../../../app.service";
import { Store } from "@ngxs/store";
import { AuthService } from "../../../../core/services";
import { markDirty } from "../../../../core/modules/ng-control/utils/form-group.utils";
import { matched } from "../../../../core/validators/validators";
import { ActivatedRoute } from "@angular/router";
import { HttpError } from "../../../../core/interfaces";
import { AuthError } from "../../enums";

@Component({
    selector: "app-reset-password",
    templateUrl: "./reset-password.component.html",
    styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
    resetPasswordForm?: FormGroup;

    loading: boolean = false;

    constructor(
        private app: AppService,
        private route: ActivatedRoute,
        private store: Store,
        private fb: FormBuilder,
        private authService: AuthService,
    ) {}

    ngOnInit(): void {
        const token = this.route.snapshot.params["token"];
        this.resetPasswordForm = this.fb.group(
            {
                password: ["", [Validators.required]],
                confirm: ["", [Validators.required]],
                token: [token, [Validators.required]],
            },
            {
                validators: matched("password", "confirm"),
            },
        );
    }

    resetRequest(): void {
        if (this.resetPasswordForm?.invalid) {
            markDirty(this.resetPasswordForm);
        }
        this.loading = true;
        this.authService.resetPassword(this.resetPasswordForm?.value).subscribe({
            next: () => {
                this.loading = false;
                this.app.success("Password has been reset successfully.");
                this.app.load("/");
            },
            error: (err: HttpError<AuthError>) => {
                this.loading = false;
                this.app.error(err.error?.message ?? "Something went wrong");
            },
        });
    }
}
