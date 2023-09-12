// tslint:disable:directive-selector
// tslint:disable:no-use-before-declare
import { Directive, Input, forwardRef, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl } from '@angular/forms';

import { equal } from './validator';

const EQUAL_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualValidator),
  multi: true
};

@Directive({
  selector: '[equal][formControlName],[equal][formControl],[equal][ngModel]',
  providers: [EQUAL_VALIDATOR]
})
export class EqualValidator implements Validator, OnInit, OnChanges {
  @Input() equal: any;

  private validator: ValidatorFn;
  private onChange: () => void;

  public ngOnInit() {
    this.validator = equal(this.equal);
  }

  public ngOnChanges(changes: SimpleChanges) {
    for (const key in changes) {
      if (key === 'equal') {
        this.validator = equal(changes[key].currentValue);
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
