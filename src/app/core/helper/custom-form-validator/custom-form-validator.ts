import { ValidatorFn, FormGroup, ValidationErrors, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get("password");
  const confirm = control.get("confirmPassword");
  return password && confirm && password.value === confirm.value
    ? null
    : { passwordMismatch: true };
};
export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control.dirty && form.invalid;
  }
}
export class StrengthPassword {
  static checkStrengthPassword(value: string){
    let regexMinlength= 8;
    let regexNumber=new RegExp("(?=.*[0-9])");
    let regexUpperCase=new RegExp("(?=.*[A-Z])");
    let regexLowerCase=new RegExp("(?=.*[a-z])");
    let regexSpecialCharacters=new RegExp("(?=.*[$@$!%*?&])");
    let regexNotAllowUTF8=new RegExp("^[a-zA-Z0-9$@$!%*?&\S]*$");

    let errorArray={
      isMinValid:value.length >= regexMinlength,
      isUpper:regexUpperCase.test(value),
      isLower:regexLowerCase.test(value),
      isSpecial:regexSpecialCharacters.test(value),
      isNumber:regexNumber.test(value),
      isUtf8:regexNotAllowUTF8.test(value)
    };
    return errorArray;
  }
}
