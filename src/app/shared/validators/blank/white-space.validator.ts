import {
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { Utils } from '../utils';

export const whiteSpace: ValidatorFn = (control: AbstractControl): { [key: string]: any } => {
  if (Utils.isNotNull(control.value) && control.value.trim() === '') {
    return { 'whiteSpace': true };
  }

  return null;
};
