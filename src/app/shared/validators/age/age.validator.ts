import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

export const age: ValidatorFn = (control: AbstractControl): { [key: string]: any } => {
  if (Utils.isPresent(Validators.required(control))) {
    return null;
  }

  const v = parseInt(control.value, 0);
  if (isNaN(v) === true) {
    return { ageInvalid: 'age have to alphanumberic' };
  }
  return ((v >= 18) && (v <= 120))
    ? null
    : { ageInvalid: 'age has to from 18 - 120 year old' };
};
