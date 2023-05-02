import { Component } from "@angular/core";

@Component({
    selector: "app-student-layout",
    templateUrl: "./student-layout.component.html",
    styleUrls: ["../shared/layout.component.scss"],
})
export class StudentLayoutComponent {
    showSidebar: boolean = true;

    footerText: string = "© 2023. All Rights Reserved.";

    constructor() {}
}
