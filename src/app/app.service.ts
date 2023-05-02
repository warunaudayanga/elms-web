// noinspection JSUnusedGlobalSymbols

import { Injectable } from "@angular/core";
import { Breakpoint } from "./core/enums";
import { Role, User } from "./core/entity";
import { Select } from "@ngxs/store";
import { AuthState } from "./core/store";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { ToastrService } from "ngx-toastr";
import { IndividualConfig } from "ngx-toastr/toastr/toastr-config";

@Injectable({
    providedIn: "root",
})
export class AppService {
    @Select(AuthState.user) getUser$!: Observable<User | undefined>;

    @Select(AuthState.loggedIn) loggedIn$!: Observable<boolean>;

    private _user?: User;

    private _width!: number;

    private _height!: number;

    private _loading: boolean = false;

    // public Do = Permission;

    public breakpoint!: Breakpoint;

    public Breakpoint = Breakpoint;

    authSubscription: Subscription;

    toastConfig: Partial<IndividualConfig>;

    constructor(private readonly router: Router, public readonly toast: ToastrService) {
        this.refreshBounds();
        this.authSubscription = this.getUser$.subscribe(user => {
            this._user = user;
        });
        this.toastConfig = { positionClass: this.mdDown ? "toast-top-center" : "toast-top-right" };
    }

    get loggedInListener(): Observable<boolean> {
        return this.loggedIn$;
    }

    get isTutor(): boolean {
        return this._user?.role === Role.TUTOR;
    }

    public refreshBounds(): void {
        this._width = window.innerWidth;
        this._height = window.innerHeight;

        if (this._width > Breakpoint.XXL) {
            this.breakpoint = Breakpoint.XXL;
        } else if (this._width > Breakpoint.XL) {
            this.breakpoint = Breakpoint.XL;
        } else if (this._width > Breakpoint.LG) {
            this.breakpoint = Breakpoint.LG;
        } else if (this._width > Breakpoint.MD) {
            this.breakpoint = Breakpoint.MD;
        } else if (this._width > Breakpoint.SM) {
            this.breakpoint = Breakpoint.SM;
        } else {
            this.breakpoint = Breakpoint.XS;
        }
    }

    get xs(): boolean {
        return Breakpoint.XS <= this._width && this._width < Breakpoint.SM;
    }

    get sm(): boolean {
        return Breakpoint.SM <= this._width && this._width < Breakpoint.MD;
    }

    get smUp(): boolean {
        return Breakpoint.SM <= this._width;
    }

    get md(): boolean {
        return Breakpoint.MD <= this._width && this._width < Breakpoint.LG;
    }

    get mdUp(): boolean {
        return Breakpoint.MD <= this._width;
    }

    get mdDown(): boolean {
        return this._width < Breakpoint.MD;
    }

    get lg(): boolean {
        return Breakpoint.LG <= this._width && this._width < Breakpoint.XL;
    }

    get lgUp(): boolean {
        return Breakpoint.LG <= this._width;
    }

    get lgDown(): boolean {
        return this._width < Breakpoint.LG;
    }

    get xl(): boolean {
        return Breakpoint.XL <= this._width && this._width < Breakpoint.XXL;
    }

    get xlUp(): boolean {
        return Breakpoint.XL <= this._width;
    }

    get xlDown(): boolean {
        return this._width < Breakpoint.XL;
    }

    get xxl(): boolean {
        return Breakpoint.XXL <= this._width;
    }

    get xxlDown(): boolean {
        return this._width < Breakpoint.XXL;
    }

    // can(Do?: Permission): boolean {
    //     if (!Do) return true;
    //     return Boolean(this.user?.role?.permissions.includes(Do));
    // }

    get loading(): boolean {
        return this._loading;
    }

    set loading(loading: boolean) {
        this._loading = loading;
    }

    get user(): User | undefined {
        return this._user;
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    public load(path: any | any[], params?: {}): void {
        if (params || typeof path !== "string") {
            this.router.navigate(path, { queryParams: params }).then();
        } else {
            this.router.navigateByUrl(path).then();
        }
    }

    public success(message: string): void {
        this.toast.success(message, undefined, this.toastConfig);
    }

    public info(message: string): void {
        this.toast.info(message, undefined, this.toastConfig);
    }

    public error(message: string): void {
        this.toast.error(message, undefined, this.toastConfig);
    }

    public warning(message: string): void {
        this.toast.warning(message, undefined, this.toastConfig);
    }

    // public infoDialog(message: string, confirm?: boolean): Observable<boolean> {
    //     return this.dialog.info(message, confirm);
    // }
    //
    // public successDialog(message: string, confirm?: boolean): Observable<boolean> {
    //     return this.dialog.success(message, confirm);
    // }
    //
    // public warningDialog(message: string, confirm?: boolean): Observable<boolean> {
    //     return this.dialog.warning(message, confirm);
    // }
    //
    // public errorDialog(message: string, confirm?: boolean): Observable<boolean> {
    //     return this.dialog.error(message, confirm);
    // }
    //
    // public viewDialog(options: ViewOptions<IObject & BaseEntity, number>): Observable<boolean> {
    //     return this.dialog.view(options);
    // }
    //
    // public promptDialog(options: PromptOptions<IObject & BaseEntity>): EventEmitter<PromptResponse> {
    //     return this.dialog.prompt(options);
    // }

    public startLoading(): void {
        // this._loading = true; // TODO
        // this.loader.startLoading();
    }

    public stopLoading(): void {
        // this.loader.stopLoading(); // TODO
        // this._loading = false;
    }

    public static log(data: any): void {
        if (!environment.production) console.log(data); // eslint-disable-line no-console
    }
}
