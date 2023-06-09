import { Component } from "@angular/core";
import { MenuItem } from "../../../core/interfaces";

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
            label: "Grades",
            icon: "bi bi-123",
            routerLink: "/admin/grades",
        },
        {
            label: "Subjects",
            icon: "bi bi-book-half",
            routerLink: "/admin/subjects",
        },
    ];
}
