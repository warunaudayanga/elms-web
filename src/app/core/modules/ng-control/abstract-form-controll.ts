// noinspection JSUnusedLocalSymbols,JSUnusedGlobalSymbols

import { AbstractControl, ControlContainer, ControlValueAccessor, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";
import { toLowerCaseBreak } from "../../utils";
import { EventEmitter } from "@angular/core";

export abstract class NgFormControl<T> implements ControlValueAccessor, Validator {
    abstract formControlName: string;

    abstract label?: string;

    abstract description?: string;

    abstract size?: "sm" | "md" | "lg";

    abstract styleClass?: string;

    abstract inputClass?: string;

    abstract disabled: boolean;

    abstract onValidation(control: AbstractControl): ValidationErrors | null;

    abstract valueChange: EventEmitter<T | null>;

    onChanged?: (value: T | null) => void;

    onTouched?: () => void;

    declare onValidatorChanged?: () => void;

    validatorInit: boolean = false;

    changed: boolean = false;

    required: boolean = false;

    value: T | null = null;

    public control?: AbstractControl | null;

    abstract noValidation: "" | undefined;

    protected constructor(protected controlContainer?: ControlContainer) {}

    protected init(): void {
        if (this.controlContainer && this.formControlName) {
            this.control = this.controlContainer.control?.get(this.formControlName);
        }
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: T): void {
        this.value = value;
    }

    registerOnChange(fn: () => void): void {
        this.onChanged = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onValidatorChanged = fn;
    }

    changeValue(value: T | null): void {
        this.control?.markAsTouched();
        this.control?.markAsDirty();
        this.onChanged?.(value);
        this.onValidatorChanged?.();
        this.valueChange?.emit(value);
    }

    // eslint-disable-next-line no-empty-function
    onValidatorInit(control: AbstractControl, validatorFns: ValidatorFn[]): void {}

    validate(control: AbstractControl): ValidationErrors | null {
        if (!this.validatorInit) {
            // @ts-ignore
            const validatorFns: ValidatorFn[] = control._rawValidators;
            for (const validatorFn of validatorFns) {
                if (validatorFn.name === "required") {
                    this.required = true;
                }
            }
            this.onValidatorInit(control, validatorFns);
            return null;
        }
        return this.onValidation?.(control) ?? null;
    }

    getName(): string {
        return toLowerCaseBreak(this.formControlName);
    }

    getInputClasses(): string {
        return (Array.isArray(this.inputClass) ? this.inputClass.join(" ") : this.inputClass) ?? "";
    }

    isInvalid(): boolean {
        return Boolean(this.control?.touched && this.control?.dirty && this.control?.invalid);
    }

    ifError(error: string): boolean {
        return this.isInvalid() && this.control?.errors?.[error];
    }
}
