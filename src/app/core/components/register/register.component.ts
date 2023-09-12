import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BackgroundLoader } from '@core/services';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  return password && confirm && password.value === confirm.value ? null : { 'passwordMismatch': true };
};
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'ite-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  errorMatcher = new CrossFieldErrorMatcher();
  registForm: FormGroup;
  error = {
    requiredField: 'This field is required',
    emailpattern: 'Not a valid emailaddress',
    pwMismatch: 'Passwords do not match!'
  }
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(
    private loader: BackgroundLoader,
    private formBuilder: FormBuilder,
    private route: Router
  ) { }

  ngAfterViewInit(): void {
    this.loader.hide();
  }
  get f() { return this.registForm.controls }
  ngOnInit() {
    this.registForm = this.formBuilder.group({
      'userName': ['', Validators.required],
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'address': [''],
      'email': ['', [Validators.required, Validators.pattern(this.emailregex)]],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, { validator: confirmPasswordValidator })
  }
  onSubmit() {
  }
  goToLoginPage() {
    this.route.navigateByUrl('login');
  }
}
