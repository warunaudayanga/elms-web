import { Component } from "@angular/core";

@Component({
    selector: "app-admin-layout",
    templateUrl: "./admin-layout.component.html",
    styleUrls: ["../shared/layout.component.scss"],
})
export class AdminLayoutComponent {
    showSidebar: boolean = true;

    footerText: string = "© 2023. All Rights Reserved.";

    constructor() {}
}
