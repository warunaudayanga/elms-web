import { Component, ElementRef, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf, ViewChild } from "@angular/core";
import { AbstractControl, ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { NgFormControl } from "../../abstract-form-controll";
import moment from "moment";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-date",
    templateUrl: "./ng-date.component.html",
    styleUrls: ["./ng-date.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgDateComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgDateComponent),
        },
    ],
})
export class NgDateComponent extends NgFormControl<Date> implements OnInit {
    @Input() label?: string;

    @Input() description?: string;

    @Input() size?: "sm" | "md" | "lg" = "md";

    @Input() formControlName!: string;

    @Input() readonly?: boolean;

    @Input() styleClass?: string;

    @Input() inputClass?: string;

    @Input() disabled: boolean = false;

    @Input() icon?: string;

    @Input() rightText?: string;

    @Input() defaultTime?: Date;

    @Input() ngTimepicker: "" | undefined;

    @Input() ngDateTimePicker: "" | undefined;

    @Input() noValidation: "" | undefined;

    @Output() valueChange: EventEmitter<Date | null> = new EventEmitter<Date | null>();

    @ViewChild("input") inputRef!: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

    dateValue: Date | null = null;

    timeValue: Date | null = null;

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
    }

    // noinspection JSUnusedLocalSymbols
    override onValidation(control: AbstractControl): ValidationErrors | null {
        return !this.required || this.value ? null : { required: true };
    }

    dateChange(value: Date | null): void {
        if (!this.timeValue && this.defaultTime) {
            this.dateValue = moment(value)
                .set("hour", moment(this.defaultTime).get("hour"))
                .set("minute", moment(this.defaultTime).get("minute"))
                .toDate();
            this.timeValue = this.dateValue;
        } else {
            this.dateValue = value;
        }
        this.changeValue(this.dateValue);
    }

    timeChange(value: Date | null): void {
        this.timeValue = value;
        this.changeValue(value);
    }
}
