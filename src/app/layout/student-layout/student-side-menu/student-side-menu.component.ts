import { Component } from "@angular/core";
import { MenuItem } from "../../../core/interfaces";

@Component({
    selector: "app-student-side-menu",
    templateUrl: "./student-side-menu.component.html",
    styleUrls: ["../../shared/side-menu.component.scss"],
})
export class StudentSideMenuComponent {
    items: MenuItem[] = [
        {
            label: "My Classes",
            icon: "bi bi-mortarboard",
            routerLink: "/student/my-classes",
        },
        {
            label: "Find Class",
            icon: "bi bi-search",
            routerLink: "/student/find-class",
        },
    ];
}
