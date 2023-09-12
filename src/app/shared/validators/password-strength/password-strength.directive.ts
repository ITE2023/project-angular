// tslint:disable:directive-selector
import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

import { passwordStrength } from './password-strength.validator';

@Directive({
  selector: '[passwordStrength][formControlName],[passwordStrength][formControl],[passwordStrength][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordStrengthValidator),
      multi: true
    }
  ]
})
export class PasswordStrengthValidator implements Validator {
  public validate(c: AbstractControl): { [key: string]: boolean } {
    return passwordStrength(c);
  }
}
