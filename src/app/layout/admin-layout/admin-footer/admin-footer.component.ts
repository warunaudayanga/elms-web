import { Component, Input } from "@angular/core";

@Component({
    selector: "app-admin-footer",
    templateUrl: "./admin-footer.component.html",
    styleUrls: ["../../shared/footer.component.scss"],
})
export class AdminFooterComponent {
    @Input() footerText: string = "";

    constructor() {}
}
