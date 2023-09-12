import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

export const passwordStrength: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  if (Utils.isPresent(Validators.required(control))) {
    return null;
  }
  const v = control.value;
  // password must 6 character, 1 uppercase character, 2 number character
  // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&]{8,}/;

  // const lowerCasePattern = '(?=.*[a-z])';
  // const upperCasePattern = '(?=.*[A-Z])';
  // const numberPattern = '(?=.*\d)';
  // const specialCharPattern = '(?=.*[$@$!%*?&])';
  // const policy = new RegExp(`/^${lowerCasePattern}${upperCasePattern}${numberPattern}${specialCharPattern}[A-Za-z\d$@$!%*?&]{10,}/`);

  return regex.test(v) ? null : { passwordStrength: true };
};
