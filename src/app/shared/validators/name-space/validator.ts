import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

// const name = /^[^@$!%*?&^(){}+#|`<>'/]{1,49}$/;

export const nameSpace: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } => {
  if (Utils.isPresent(Validators.required(control))) {
    return null;
  }

  const v: string = control.value;
  return v.trim() === '' ? { 'nameSpace': true } : null;
};
