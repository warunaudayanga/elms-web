import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Host,
    Input,
    OnInit,
    Optional,
    Output,
    SkipSelf,
    ViewChild,
} from "@angular/core";
import { AbstractControl, ControlContainer, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from "@angular/forms";
import { NgFormControl } from "../../abstract-form-controll";

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: "ng-input",
    templateUrl: "./ng-input.component.html",
    styleUrls: ["./ng-input.component.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgInputComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            // eslint-disable-next-line no-use-before-define
            useExisting: forwardRef(() => NgInputComponent),
        },
    ],
})
export class NgInputComponent extends NgFormControl<Date | string> implements OnInit, AfterViewInit {
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

    @Input() max?: number;

    @Input() min?: number;

    @Input() ngEmail: "" | undefined;

    @Input() ngNumber: "" | undefined;

    @Input() ngPassword: "" | undefined;

    @Input() ngTextarea: "" | undefined;

    @Input() ngDatepicker: "" | undefined;

    @Input() ngTimepicker: "" | undefined;

    @Input() noAutoComplete: "" | undefined;

    @Input() noValidation: "" | undefined;

    @Output() valueChange: EventEmitter<Date | string | null> = new EventEmitter<Date | string | null>();

    @ViewChild("input") inputRef!: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

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

    ngAfterViewInit(): void {
        if (this.ngTextarea !== undefined) {
            setTimeout(() => this.autoResizeTextArea());
        }
    }

    // noinspection JSUnusedLocalSymbols
    override onValidation(control: AbstractControl): ValidationErrors | null {
        return !this.required || this.value ? null : { required: true };
    }

    getType(): string {
        switch ("") {
            case this.ngPassword:
                return "password";
            case this.ngEmail:
                return "text";
            case this.ngNumber:
                return "number";
            default:
                return "text";
        }
    }

    autoResizeTextArea(): void {
        const textarea = this.inputRef.nativeElement as HTMLTextAreaElement;
        textarea.style.height = "auto";
        if (this.value !== "") {
            textarea.style.height = `${textarea.scrollHeight + 2}px`;
        }
    }
}
