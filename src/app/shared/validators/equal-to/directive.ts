// tslint:disable:directive-selector
// tslint:disable:no-use-before-declare
import { Directive, Input, forwardRef, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

import { equalTo } from './validator';

const EQUAL_TO_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EqualToValidator),
  multi: true
};

@Directive({
  selector: '[equalTo][formControlName],[equalTo][formControl],[equalTo][ngModel]',
  providers: [EQUAL_TO_VALIDATOR]
})
export class EqualToValidator implements Validator, OnInit {
  @Input() equalTo: FormControl;

  private validator: ValidatorFn;

  public ngOnInit() {
    this.validator = equalTo(this.equalTo);
  }

  public validate(c: AbstractControl): { [key: string]: any } {
    return this.validator(c);
  }
}
