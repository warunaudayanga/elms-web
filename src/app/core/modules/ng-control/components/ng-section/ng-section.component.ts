import { Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { NgSectionContentDirective } from "../../directives/ng-section/ng-section-content.directive";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-section",
    templateUrl: "./ng-section.component.html",
    styleUrls: ["./ng-section.component.scss"],
})
export class NgSectionComponent implements OnChanges {
    @Input() loading: boolean = false;

    @Input() error: boolean = false;

    @Input() styleClass: string = "";

    @Output() onRefresh: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @ContentChild(NgSectionContentDirective) content?: NgSectionContentDirective;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["loading"]) {
            this.loading = changes["loading"].currentValue;
        }
        if (changes["error"]) {
            this.error = changes["error"].currentValue;
        }
    }

    refresh(e: MouseEvent): void {
        this.onRefresh.emit(e);
    }
}
