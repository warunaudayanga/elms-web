import { FormGroup } from "@angular/forms";

export const markDirty = (formGroup: FormGroup): void => {
    Object.keys(formGroup.controls).forEach(field => {
        const control = formGroup!.get(field);
        if (control?.invalid) {
            control?.markAsDirty({ onlySelf: true });
            control?.markAsTouched({ onlySelf: true });
        }
    });
};
