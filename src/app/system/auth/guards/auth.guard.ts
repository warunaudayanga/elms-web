import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppService } from "../../../app.service";
import { Select, Store } from "@ngxs/store";
import { AuthState, Logout } from "../../../core/store";
import { Role } from "../../../core/entity";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    @Select(AuthState.loggedIn) loggedIn$!: Observable<boolean>;

    loggedIn: boolean = false;

    constructor(private readonly store: Store, private readonly app: AppService) {
        this.loggedIn$.subscribe(loggedIn => {
            this.loggedIn = loggedIn;
        });
    }

    getResolvedUrl(route: ActivatedRouteSnapshot): string {
        return (
            route.pathFromRoot
                // eslint-disable-next-line prettier/prettier
                .map(v => v.url.map(segment => segment.toString()).filter(v => v !== "").join("/"))
                .filter(v => v !== "")
                .join("/")
        );
    }

    // noinspection JSUnusedGlobalSymbols
    getConfiguredUrl(route: ActivatedRouteSnapshot): string {
        return (
            "/" +
            route.pathFromRoot
                .filter(v => v.routeConfig)
                .map(v => v.routeConfig!.path)
                .filter(v => v !== "")
                .join("/")
        );
    }

    // noinspection JSUnusedLocalSymbols
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot, // eslint-disable-line
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.loggedIn) {
            const role = this.store.selectSnapshot(AuthState.role);
            const roles = route.data["roles"] as Role[];
            if (!role) {
                this.app.load("auth");
                return false;
            }
            if (
                this.getResolvedUrl(route) !== "" &&
                !this.getResolvedUrl(route).match(/auth/) &&
                roles.includes(role)
            ) {
                return true;
            }
            this.redirect(role);
            return false;
        } else if (this.getResolvedUrl(route).match(/auth/)) {
            return true;
        }
        this.app.load("auth");
        return false;
    }

    redirect(role: Role): void {
        switch (role) {
            case Role.SUPER_ADMIN:
                this.app.load("admin");
                break;
            case Role.ADMIN:
                this.app.load("admin");
                break;
            case Role.TUTOR:
                this.app.load("tutor");
                break;
            case Role.STUDENT:
                this.app.load("student");
                break;
            default:
                this.store.dispatch(new Logout());
        }
    }
}
