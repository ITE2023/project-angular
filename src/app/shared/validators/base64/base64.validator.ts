import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

export const base64: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  if (Utils.isPresent(Validators.required(control))) {
    return null;
  }

  const v: string = control.value;
  return /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i.test(v)
    ? null
    : { 'base64': true };
};
