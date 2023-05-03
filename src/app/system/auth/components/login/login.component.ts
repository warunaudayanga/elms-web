import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../core/services";
import { Store } from "@ngxs/store";
import { AppService } from "../../../../app.service";
import { markDirty } from "../../../../core/modules/ng-control/utils/form-group.utils";
import { Login } from "../../../../core/store";
import { Subscription } from "rxjs";
import { AuthError } from "../../enums";
import { HttpError } from "../../../../core/interfaces";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
    loginForm?: FormGroup;

    loginLoading: boolean = false;

    resendLoading: boolean = false;

    verificationBtn: boolean = false;

    authErrorSubscription: Subscription;

    constructor(private app: AppService, private store: Store, private fb: FormBuilder, private authService: AuthService) {
        this.authErrorSubscription = this.authService.getAuthenticationErrorListener().subscribe(authError => {
            this.loginLoading = false;
            if (authError === AuthError.AUTH_403_PENDING) {
                this.verificationBtn = true;
            }
        });
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]],
        });
    }

    login(): void {
        if (this.loginForm?.invalid) {
            markDirty(this.loginForm);
            return;
        }
        this.loginLoading = true;
        this.store.dispatch(new Login(this.loginForm!.value));
    }

    resendVerification(): void {
        this.resendLoading = true;
        this.authService.resendVerification(this.loginForm!.value.username).subscribe({
            next: () => {
                this.resendLoading = false;
                this.app.success("Verification email has been sent");
            },
            error: (err: HttpError) => {
                this.app.error(err.error?.message ?? "Something went wrong");
            },
        });
    }

    ngOnDestroy(): void {
        this.authErrorSubscription.unsubscribe();
    }
}
