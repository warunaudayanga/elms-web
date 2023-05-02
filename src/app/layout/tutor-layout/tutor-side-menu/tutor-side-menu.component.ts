import { Component } from "@angular/core";
import { MenuItem } from "../../../core/interfaces/menu.interface";
import { Store } from "@ngxs/store";
import { Logout } from "../../../core/store";

@Component({
    selector: "app-tutor-side-menu",
    templateUrl: "./tutor-side-menu.component.html",
    styleUrls: ["../../shared/side-menu.component.scss"],
})
export class TutorSideMenuComponent {
    items: MenuItem[] = [
        {
            label: "My Classes",
            icon: "bi bi-mortarboard",
            routerLink: "/student/my-classes",
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
