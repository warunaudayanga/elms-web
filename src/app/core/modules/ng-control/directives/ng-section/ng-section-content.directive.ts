import { Directive, TemplateRef } from "@angular/core";

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: "[ngSectionContent]",
})
export class NgSectionContentDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}
