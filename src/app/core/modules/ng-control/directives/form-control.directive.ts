import { Directive, ElementRef, HostListener } from "@angular/core";
import { ControlValueAccessor, NgControl } from "@angular/forms";

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: "[validateInput]" })
export class FormControlDirective {
    hasChanged: boolean = false;

    hasTyped: boolean = false;

    hasFocusedAndLost: boolean = false;

    constructor(private readonly element: ElementRef, private control: NgControl) {
        this.trimValueAccessor(control.valueAccessor);
    }

    private validate(): void {
        if (this.control.invalid) {
            this.element.nativeElement.classList.add("is-invalid");
        } else {
            this.element.nativeElement.classList.remove("is-invalid");
        }
    }

    trimValueAccessor(valueAccessor: ControlValueAccessor | null): void {
        if (valueAccessor) {
            const original = valueAccessor.registerOnChange;
            valueAccessor.registerOnChange = (fn: (_: unknown) => void): void => {
                return original.call(valueAccessor, (value: unknown) => {
                    return fn(typeof value === "string" ? value.trim() : value);
                });
            };
        }
    }

    @HostListener("keypress", ["$event"])
    onKeyPress(e: KeyboardEvent): void {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    @HostListener("keyup", ["$event"])
    onKeyUp(e: KeyboardEvent): void {
        if (!this.hasTyped) this.hasTyped = true;
        if (this.control.touched || this.hasChanged) {
            this.validate();
        }
        if (e.key === "Enter") {
            const element = this.element.nativeElement as HTMLInputElement | HTMLTextAreaElement;
            element.style.outline = "none";
            if ((!element.hasAttribute("required") || this.control.value !== "") && this.control.valid) {
                const element = this.element.nativeElement as HTMLInputElement | HTMLTextAreaElement;
                const form = element.closest("form");
                const submit = form?.querySelector("[type='submit']") as HTMLButtonElement;
                const inputs = Array.from(form?.querySelectorAll("[name]") as NodeListOf<HTMLElement>);
                const currentIndex = inputs.indexOf(element);
                if (currentIndex !== inputs.length - 1) {
                    if (inputs[currentIndex + 1].tagName === "NG-SELECT") {
                        const element = inputs[currentIndex + 1].querySelector("INPUT") as HTMLInputElement;
                        element.focus();
                        element.select();
                    } else {
                        const element = inputs[currentIndex + 1] as HTMLInputElement;
                        element.focus();
                        element.select();
                    }
                } else {
                    submit.click();
                }
            }
            e.preventDefault();
        }
    }

    @HostListener("blur")
    onLostFocus(): void {
        if (!this.hasFocusedAndLost) this.hasFocusedAndLost = true;
        if (this.hasTyped) this.validate();
    }

    @HostListener("change")
    onChange(): void {
        if (!this.hasChanged) this.hasChanged = true;
        this.validate();
    }
}
