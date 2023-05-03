import { Component, EventEmitter, forwardRef, Host, Input, OnChanges, OnInit, Optional, Output, SimpleChanges, SkipSelf } from "@angular/core";
import { NgFormControl } from "../../abstract-form-controll";
import { AbstractControl, ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-select-box",
    templateUrl: "./ng-select-box.component.html",
    styleUrls: ["./ng-select-box.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgSelectBoxComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgSelectBoxComponent),
        },
    ],
})
export class NgSelectBoxComponent<T> extends NgFormControl<T[] | T> implements OnInit, OnChanges {
    @Input() label?: string;

    @Input() description?: string;

    @Input() size?: "sm" | "md" | "lg" = "md";

    @Input() formControlName!: string;

    @Input() readonly?: boolean;

    @Input() styleClass?: string;

    @Input() inputClass?: string;

    @Input() items: T[] = [];

    @Input() bindLabel: string = "";

    @Input() bindValue: string = "";

    @Input() clearable: boolean = true;

    @Input() searchable: boolean = true;

    @Input() multiple: boolean = false;

    @Input() disabled: boolean = false;

    @Input() placeholder: string = "";

    @Input() noValidation: "" | undefined;

    @Output() valueChange: EventEmitter<T[] | T | null> = new EventEmitter<T[] | T | null>();

    constructor(
        @Optional()
        @Host()
        @SkipSelf()
        protected override controlContainer?: ControlContainer,
    ) {
        super(controlContainer);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["items"]) {
            this.items = changes["items"].currentValue;
        }
    }

    ngOnInit(): void {
        this.init();
    }

    // noinspection JSUnusedLocalSymbols
    override onValidation(control: AbstractControl): ValidationErrors | null {
        return !this.required || this.value ? null : { required: true };
    }
}
