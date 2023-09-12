// tslint:disable:directive-selector
// tslint:disable:no-use-before-declare
import { Directive, Input, forwardRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { phone } from './validator';

const PHONE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PhoneValidator),
  multi: true
};

@Directive({
  selector: '[phone][formControlName],[phone][formControl],[phone][ngModel]',
  providers: [PHONE_VALIDATOR]
})
export class PhoneValidator implements Validator, OnInit, OnChanges {
  @Input() public phone: string;

  private validator: ValidatorFn;
  private onChange: () => void;

  public ngOnInit() {
    this.validator = phone(this.phone);
  }

  public ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'phone') {
        this.validator = phone(changes[key].currentValue);
        if (this.onChange) {
          this.onChange();
        }
      }
    }
  }

  public validate(c: AbstractControl): { [key: string]: any } {
    return this.validator(c);
  }

  public registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }
}
