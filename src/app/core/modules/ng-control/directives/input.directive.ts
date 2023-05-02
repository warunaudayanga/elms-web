import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: "input, ng-select",
})
export class InputDirective implements AfterViewInit {
    constructor(private readonly element: ElementRef<HTMLInputElement>) {
        element.nativeElement.style.outline = "none !important";
    }

    ngAfterViewInit(): void {
        if (this.element.nativeElement.tagName === "INPUT") {
            this.element.nativeElement.style.setProperty("outline", "none", "important");
        }
        if (this.element.nativeElement.tagName === "NG-SELECT") {
            this.element.nativeElement.querySelectorAll("input").forEach(input => {
                input.style.setProperty("outline", "none", "important");
                input.style.setProperty("cursor", "pointer", "important");
            });
        }
    }
}
