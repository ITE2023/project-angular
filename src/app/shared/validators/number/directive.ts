// tslint:disable:directive-selector
// tslint:disable:no-use-before-declare
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { number } from './validator';

const NUMBER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NumberValidator),
  multi: true
};

@Directive({
  selector: '[number][formControlName],[number][formControl],[number][ngModel]',
  providers: [NUMBER_VALIDATOR]
})
export class NumberValidator implements Validator {
  public validate(c: AbstractControl): { [key: string]: any } {
    return number(c);
  }
}
