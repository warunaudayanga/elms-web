import { Component, Input } from "@angular/core";

@Component({
    selector: "app-student-footer",
    templateUrl: "./student-footer.component.html",
    styleUrls: ["../../shared/footer.component.scss"],
})
export class StudentFooterComponent {
    @Input() footerText: string = "";

    constructor() {}
}
