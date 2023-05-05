import { Component } from "@angular/core";
import { MenuItem } from "../../../core/interfaces";

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
    ];
}
