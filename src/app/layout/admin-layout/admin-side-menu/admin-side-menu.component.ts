import { Component } from "@angular/core";
import { MenuItem } from "../../../core/interfaces/menu.interface";
import { Store } from "@ngxs/store";
import { Logout } from "../../../core/store";

@Component({
    selector: "app-admin-side-menu",
    templateUrl: "./admin-side-menu.component.html",
    styleUrls: ["../../shared/side-menu.component.scss"],
})
export class AdminSideMenuComponent {
    items: MenuItem[] = [
        {
            label: "Manage Classes",
            icon: "bi bi-mortarboard",
            routerLink: "/admin/classes",
        },
        {
            label: "Manage Tutors",
            icon: "bi bi-people",
            routerLink: "/admin/tutors",
        },
        {
            label: "Manage Students",
            icon: "bi bi-people",
            routerLink: "/admin/students",
        },
        {
            label: "Logout",
            icon: "bi bi-power",
            action: (): void => {
                this.store.dispatch(new Logout());
            },
        },
    ];

    constructor(private store: Store) {}
}
