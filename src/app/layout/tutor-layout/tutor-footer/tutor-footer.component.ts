import { Component, Input } from "@angular/core";

@Component({
    selector: "app-tutor-footer",
    templateUrl: "./tutor-footer.component.html",
    styleUrls: ["../../shared/footer.component.scss"],
})
export class TutorFooterComponent {
    @Input() footerText: string = "";

    constructor() {}
}
