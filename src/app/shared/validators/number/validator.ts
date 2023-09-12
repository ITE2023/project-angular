import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

// tslint:disable-next-line:variable-name
export const number: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  if (Utils.isPresent(Validators.required(control))) {
    return null;
  }

  const v: string = control.value;
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) ? null : { 'number': true };
};
