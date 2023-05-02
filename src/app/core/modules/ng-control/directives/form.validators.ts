// noinspection JSUnusedGlobalSymbols

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const tagInputMin = (size: number): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        return (control.value as string[]).length < size ? { tagInputMin: size } : null;
    };
};
