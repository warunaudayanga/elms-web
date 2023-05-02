import { Component, Input } from "@angular/core";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-spinner",
    templateUrl: "./ng-spinner.component.html",
    styleUrls: ["./ng-spinner.component.scss"],
})
export class NgSpinnerComponent {
    @Input() size: string | number = 50;

    @Input() width: string | number = 5;

    @Input() invert: boolean = false;
}
