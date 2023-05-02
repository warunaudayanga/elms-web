import { Component, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf } from "@angular/core";
import { AbstractControl, ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { NgFormControl } from "../../abstract-form-controll";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-switch",
    templateUrl: "./ng-switch.component.html",
    styleUrls: ["./ng-switch.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgSwitchComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgSwitchComponent),
        },
    ],
})
export class NgSwitchComponent extends NgFormControl<boolean> implements OnInit {
    @Input() label?: string;

    @Input() description?: string;

    @Input() size?: "sm" | "md" | "lg" = "md";

    @Input() formControlName!: string;

    @Input() styleClass?: string;

    @Input() inputClass?: string;

    @Input() checked?: boolean | "";

    @Input() disabled: boolean = false;

    @Input() noValidation: "" | undefined;

    @Output() valueChange: EventEmitter<boolean | null> = new EventEmitter<boolean | null>();

    constructor(
        @Optional()
        @Host()
        @SkipSelf()
        protected override controlContainer?: ControlContainer,
    ) {
        super(controlContainer);
    }

    ngOnInit(): void {
        this.init();
        this.value = Boolean(this.checked || this.checked === "");
    }

    override writeValue(value: boolean): void {
        this.value = Boolean(value);
    }

    // noinspection JSUnusedLocalSymbols
    override onValidation(control: AbstractControl): ValidationErrors | null {
        return !this.required || this.value ? null : { required: true };
        // return null;
    }
}
