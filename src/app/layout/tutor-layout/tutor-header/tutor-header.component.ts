import { Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { MenuItem } from "../../../core/interfaces";
import { Logout } from "../../../core/store";

@Component({
    selector: "app-tutor-header",
    templateUrl: "./tutor-header.component.html",
    styleUrls: ["../../shared/header.component.scss"],
})
export class TutorHeaderComponent {
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
