import { Injectable, NgZone } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { Role, User } from "../../entity";
import { ClearLoggedUser, Login, Logout, SetLoggedUser } from "./auth.action";
import { catchError, Observable, of, take } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { AppService } from "../../../app.service";
import { AuthService } from "../../services";
import { StateClear } from "ngxs-reset-plugin";
import { HttpError, SuccessResponse } from "../../interfaces";
import { AuthError } from "../../../system/auth/enums";

interface AuthStateModel {
    loggedIn: boolean;
    user?: User;
}

@State<AuthStateModel>({
    name: "auth",
    defaults: {
        loggedIn: false,
        user: undefined,
    },
})
@Injectable()
export class AuthState {
    constructor(private app: AppService, private authService: AuthService, private store: Store, private ngZone: NgZone) {}

    @Selector()
    static loggedIn(state: AuthStateModel): boolean {
        return state.loggedIn;
    }

    @Selector()
    static loggedUser(state: AuthStateModel): User | undefined {
        return state.loggedIn ? state.user : undefined;
    }

    @Selector()
    static user(state: AuthStateModel): User | undefined {
        return state.user;
    }

    @Selector()
    static role(state: AuthStateModel): Role | undefined {
        return state.user?.role;
    }

    @Action(Login)
    login({ patchState }: StateContext<AuthStateModel>, action: Login): Observable<User | null> {
        return this.authService.login(action.payload).pipe(
            take(1),
            tap((user: User) => {
                patchState({
                    loggedIn: true,
                    user,
                });
                this.ngZone.run(() => {
                    switch (user.role) {
                        case Role.SUPER_ADMIN:
                            this.app.load("admin");
                            break;
                        case Role.ADMIN:
                            this.app.load("admin");
                            break;
                        case Role.TUTOR:
                            this.app.load("tutor");
                            break;
                        default:
                            this.app.load("student");
                    }
                });
            }),
            catchError((err: HttpError<AuthError>) => {
                this.ngZone.run(() => {
                    this.app.error(err.error?.message || "Failed to Login!");
                    this.authService.setAuthenticationError(err.error?.code);
                });
                return of(null);
            }),
        );
    }

    @Action(Logout)
    logout(): Observable<SuccessResponse | null> {
        return this.authService.logout().pipe(
            tap(() => {
                this.ngZone.run(() => {
                    this.store.dispatch(new StateClear());
                    this.app.load("/");
                });
            }),
            catchError((err: HttpErrorResponse) => {
                this.ngZone.run(() => {
                    this.app.error(err.error?.message || "Something went wrong!");
                    this.store.dispatch(new StateClear());
                    this.app.load("/");
                });
                return of(null);
            }),
        );
    }

    @Action(SetLoggedUser)
    setLoggedUser({ patchState }: StateContext<AuthStateModel>, action: SetLoggedUser): void {
        patchState({
            loggedIn: true,
            user: action.payload,
        });
    }

    @Action(ClearLoggedUser)
    clearLoggedUser({ setState }: StateContext<AuthStateModel>): void {
        setState({
            loggedIn: false,
            user: undefined,
        });
    }
}
