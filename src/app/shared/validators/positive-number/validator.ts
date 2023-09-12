import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { Utils } from '../utils';

export const positiveNumber: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  if (Utils.isPresent(Validators.required(control))) {
    return null;
  }
  
  const v = control.value;
  return (Number(v) <= 0) ? { 'positiveNumber': true } : null;
};
