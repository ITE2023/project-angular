// tslint:disable:directive-selector
// tslint:disable:no-use-before-declare
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { base64 } from './base64.validator';

const BASE64_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => Base64Validator),
  multi: true
};

@Directive({
  selector: '[base64][formControlName],[base64][formControl],[base64][ngModel]',
  providers: [BASE64_VALIDATOR]
})
export class Base64Validator implements Validator {
  public validate(c: AbstractControl): { [key: string]: any } {
    return base64(c);
  }
}
