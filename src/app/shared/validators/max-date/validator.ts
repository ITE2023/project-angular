import { AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import { Utils } from '../utils';

// tslint:disable-next-line:variable-name
export const maxDate = (_maxDate: any): ValidatorFn => {
  if (!Utils.isDate(_maxDate) && !(_maxDate instanceof Function)) {
    throw Error('maxDate value must be or return a formatted date');
  }

  return (control: AbstractControl): { [key: string]: any } => {
    if (Utils.isPresent(Validators.required(control))) {
      return null;
    }

    const d: Date = new Date(control.value);

    if (!Utils.isDate(d)) {
      return { maxDate: true };
    }
    if (_maxDate instanceof Function) {
      _maxDate = _maxDate();
    }

    return d <= new Date(_maxDate) ? null : { maxDate: true };
  };
};
