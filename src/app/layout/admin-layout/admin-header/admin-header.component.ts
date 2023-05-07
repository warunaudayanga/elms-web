import { Component } from "@angular/core";
import { MenuItem } from "../../../core/interfaces";
import { Logout } from "../../../core/store";
import { Store } from "@ngxs/store";

@Component({
    selector: "app-admin-header",
    templateUrl: "./admin-header.component.html",
    styleUrls: ["../../shared/header.component.scss"],
})
export class AdminHeaderComponent {
    constructor(private readonly store: Store) {}

    menuItems: MenuItem[] = [
        {
            label: "Logout",
            icon: "bi bi-power",
            action: (): void => {
                this.store.dispatch(new Logout());
            },
        },
    ];
}
