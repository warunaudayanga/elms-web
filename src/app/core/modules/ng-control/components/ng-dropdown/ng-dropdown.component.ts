import { Component, Input } from "@angular/core";
import { NgItem } from "../../interfaces/ng-dropdown.interfaces";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-dropdown",
    templateUrl: "./ng-dropdown.component.html",
    styleUrls: ["./ng-dropdown.component.scss"],
})
export class NgDropdownComponent {
    @Input() class?: string;

    @Input() title?: string;

    @Input() items?: NgItem[];

    @Input() buttonClass?: string;

    @Input() hoverable?: boolean;

    @Input() autoClose?: boolean = true;

    opened: boolean = false;

    constructor() {}
}
