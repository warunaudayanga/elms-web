import { Component } from "@angular/core";

@Component({
    selector: "app-tutor-layout",
    templateUrl: "./tutor-layout.component.html",
    styleUrls: ["../shared/layout.component.scss"],
})
export class TutorLayoutComponent {
    showSidebar: boolean = true;

    footerText: string = "© 2023. All Rights Reserved.";

    constructor() {}
}
