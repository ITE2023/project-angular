// tslint:disable:directive-selector
import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { age } from './age.validator';

@Directive({
  selector: '[age]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeValidator),
      multi: true
    }
  ]
})

export class AgeValidator implements Validator {
  public validate(c: AbstractControl): { [key: string]: any } {
    return age(c);
  }
}
