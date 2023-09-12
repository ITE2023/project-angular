import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

export const equal = (val: any): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } => {
    if (Utils.isPresent(Validators.required(control))) {
      return null;
    }

    const v: any = control.value;

    return val === v ? null : { equal: true };
  };
};
