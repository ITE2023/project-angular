// tslint:disable:directive-selector
import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { whiteSpace } from './white-space.validator';

@Directive({
  selector: '[blank]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => WhiteSpaceValidator),
      multi: true
    }
  ]
})

export class WhiteSpaceValidator implements Validator {
  public validate(c: AbstractControl): { [key: string]: any } {
    return whiteSpace(c);
  }
}
