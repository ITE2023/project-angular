import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

// tslint:disable-next-line:variable-name
export const minDate = (_minDate: any): ValidatorFn => {

  if (!Utils.isDate(_minDate) && !(_minDate instanceof Function)) {
    throw Error('minDate value must be or return a formatted date');
  }

  return (control: AbstractControl): { [key: string]: any } => {
    if (Utils.isPresent(Validators.required(control))) {
      return null;
    }

    const d: Date = new Date(control.value);

    if (!Utils.isDate(d)) {
      return { minDate: true };
    }
    if (_minDate instanceof Function) {
      _minDate = _minDate();
    }

    return d >= new Date(_minDate) ? null : { minDate: true };
  };
};
