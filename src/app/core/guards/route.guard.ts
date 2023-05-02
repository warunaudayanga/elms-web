import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { firstValueFrom, Observable } from "rxjs";
import { AppService } from "../../app.service";
import { AuthService } from "../services";
import { Select } from "@ngxs/store";
import { AuthState } from "../store";

@Injectable({
    providedIn: "root",
})
export class RouteGuard implements CanActivate {
    @Select(AuthState.loggedUser) getAccessToken$!: Observable<string | undefined>;

    constructor(
        private readonly app: AppService,
        private readonly auth: AuthService,
        private readonly router: Router, // eslint-disable-line
    ) {}

    // noinspection JSUnusedLocalSymbols
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot, // eslint-disable-line
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.autoAuth();
    }

    async autoAuth(): Promise<boolean> {
        const token = await firstValueFrom(this.getAccessToken$);
        if (!token) {
            return true;
        }
        try {
            await this.router.navigateByUrl("/");
            return false;
        } catch (e: any) {
            return true;
        }
    }
}
