// tslint:disable:directive-selector
import {
  Directive, forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef
} from '@angular/core';

import {
  ValidatorFn,
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  Validators
} from '@angular/forms';

import { mandatory } from './mandatory.validator';

@Directive({
  selector: '[mandatory]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MandatoryValidator),
      multi: true
    }
  ],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.field-error]': 'hasError'
  }
})

export class MandatoryValidator implements Validator, OnChanges {
  @Input() public customRequired: string;
  public valFn: ValidatorFn = Validators.nullValidator;

  public hasError: boolean = false;

  constructor(public el: ElementRef) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const change = changes['customRequired'];
    if (change) {
      const val: string = change.currentValue;
      this.valFn = mandatory(val);
    } else {

      this.valFn = Validators.nullValidator;
    }
  }

  public validate(control: AbstractControl) {
    const result = this.valFn(control);
    let validation = (control.dirty || control.touched) && control.value && control.value.trim() === '';

    if (typeof validation === 'string') {
      validation = true;
    }

    this.hasError = validation;
    return result;
  }
}
