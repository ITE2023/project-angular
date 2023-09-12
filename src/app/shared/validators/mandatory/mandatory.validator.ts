import { AbstractControl, ValidatorFn } from '@angular/forms';

export const mandatory = (fieldName: string): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } => {
        const input = control.value;
        if (input !== null && typeof input !== 'undefined') {
            return (input.trim() !== '')
                ? null
                : { required: `${fieldName} is mandatory` };
        }
        return null;
    };
};
