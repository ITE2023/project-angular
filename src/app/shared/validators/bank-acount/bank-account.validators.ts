import {
    AbstractControl,
    ValidatorFn
} from '@angular/forms';
import { Utils } from '../utils';

export const bankAccount: ValidatorFn = (control: AbstractControl): { [key: string]: any } => {
    let result = null;
    if (Utils.isNotNull(control.value) === true) {
        const v = Number(control.value);
        const v1 = Number(control.value.replace('711A', ''));
        const value = String(control.value);
        if (isNaN(v) === true) {
            if (value.startsWith('711A') === false) {
                result = { 'bankAccount': true };
            }
            if (Utils.count(control.value, '711A') > 1) {
                result = { 'bankAccount': true };
            }
            if (isNaN(v1) === true) {
                result = { 'bankAccount': true };
            }
        }
    }
    return result;
};
