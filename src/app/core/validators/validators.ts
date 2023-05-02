import { FormGroup } from "@angular/forms";

export const matched = (controlName: string, matchingControlName: string): ((formGroup: FormGroup) => null) => {
    return (formGroup: FormGroup): null => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (control.value && control.value !== matchingControl.value) {
            matchingControl.setErrors({ matched: true });
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    };
};
