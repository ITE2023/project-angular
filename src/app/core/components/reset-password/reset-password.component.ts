import { Component, OnInit } from "@angular/core";
import {
  langSettings,
  CommonErrorCode,
  LocalStorageType,
} from "@core/constants";
import { TranslateService } from "@ngx-translate/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  ValidationErrors,
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ProfileService } from "@core/services/app/profile/profile.service";
import { FormValidators } from "src/app/shared/validators";
import { StrengthPassword } from "../../helper/custom-form-validator/custom-form-validator";
/** passwords must match - custom validator */
export const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const new_password = control.get("new_password");
  const confirm_password = control.get("confirm_password");
  return new_password &&
    confirm_password &&
    new_password.value === confirm_password.value
    ? null
    : { passwordMismatch: true };
};

export class ResetPassWordModel {
  otp: string;
  new_password: string;
  refId: string;
}

@Component({
  selector: "ite-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  public user = {
    ref_id: "",
    otp: "",
    new_password: "",
    confirm_password: "",
  };
  public errorList: any = {
    isMinValid: false,
    isUpper: false,
    isLower: false,
    isSpecial: false,
    isNumber: false,
    isUtf8: false,
  };
  public langSetting = langSettings;
  public data: ResetPassWordModel;
  public langCode = "vi";
  public errors_massage = "";
  public flag: string;
  public submitted = false;
  public expire_otp = false;
  public commonErrorCode = CommonErrorCode;
  public resetPwForm: FormGroup;
  constructor(
    public translate: TranslateService,
    public fb: FormBuilder,
    private profileService: ProfileService,
    private routeActive: ActivatedRoute,
    private route: Router,
    private toaster: ToastrService
  ) {
    this.data = new ResetPassWordModel();
    this.user.ref_id = sessionStorage.getItem("guid_mm");
  }

  ngOnInit(): void {
    if (localStorage.getItem(LocalStorageType.LoginLanguage)) {
      this.changeLang(localStorage.getItem(LocalStorageType.LoginLanguage));
    } else {
      this.changeLang("vi");
    }

    const new_password = new FormControl("", [
      Validators.required,
      // ,
      // FormValidators.passwordStrength
    ]);

    const confirm_password = new FormControl("", [
      Validators.required,
      FormValidators.equalTo(new_password),
    ]);

    this.resetPwForm = this.fb.group({
      otp: ["", Validators.required],
      new_password: new_password,
      confirm_password: confirm_password,
    });

    // this.resetPwForm = this.fb.group({
    //   otp: ['', Validators.required],
    //   new_password: ['', Validators.compose([
    //     Validators.required,
    //     // Validators.minLength(6),
    //     // // 2. check whether the entered password has a number
    //     // CustomValidators.patternValidator(/\d/, { hasNumber: true }),
    //     // // 3. check whether the entered password has upper case letter
    //     // CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
    //     // // 4. check whether the entered password has a lower-case letter
    //     // CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
    //     // // 5. check whether the entered password has a special character
    //     // CustomValidators.patternValidator(/[!@#$%^&*()_+\-={};':"|,.<>?]/, { hasSpecialCharacters: true }),
    //     // // 6. Has a minimum length of 8 characters
    //     // CustomValidators.patternValidator(/^\S*$/, { hasSpace: true })
    //   ])],
    //   confirm_password: ['', Validators.required ]
    // }, { validator: MustMatch('new_password', 'confirm_password') });
  }

  changeLang(lang: string) {
    localStorage.setItem(LocalStorageType.LoginLanguage, lang);
    this.langCode = lang;
    this.flag = this.getLangSetting(this.langCode).flag;
    this.translate.use(lang);
  }
  get f() {
    return this.resetPwForm?.controls;
  }
  getOTP() {
    let get_expire_otp = JSON.parse(localStorage.getItem(LocalStorageType.OTP));
    this.profileService
      .confirmResetPws({
        contact: get_expire_otp == null ? "" : get_expire_otp.email,
      })
      .subscribe((res) => {
        if (res.ref_id != null && res.error_code === "00") {
          sessionStorage.setItem("guid_mm", res.ref_id);
          this.user.ref_id = res.ref_id;
          this.expire_otp = false;
          this.submitted = false;
          let date = new Date();
          let second = date.getUTCSeconds().toString();
          if (date.getUTCSeconds() < 10) {
            second = "0" + second;
          }
          let expire_otp = {
            expire: date.getUTCMinutes().toString() + second,
            email: get_expire_otp == null ? "" : get_expire_otp.email,
          };
          localStorage.setItem(
            LocalStorageType.OTP,
            JSON.stringify(expire_otp)
          );
          this.user.otp = null;
          this.toaster.success(
            this.translate.instant(`reset_pw.success_get_otp`)
          );
          return;
        } else {
          if (res.error_code === "11") {
            this.toaster.error(
              this.translate.instant(`error_code.forgot.error_11`)
            );
            return;
          }
          this.toaster.error(this.translate.instant(`reset_pw.fail_get_otp`));
          return;
        }
      });
  }
  checkValue(e) {
    if (e.keycode === 8) {
      this.errorList = StrengthPassword.checkStrengthPassword(e.target.value);
    }
    if (e.target.value?.trim() !== "") {
      this.errorList = StrengthPassword.checkStrengthPassword(e.target.value);
    } else {
      this.errorList.isMinValid =
        this.errorList.isNumber =
        this.errorList.isSpecial =
        this.errorList.isUpper =
        this.errorList.isLower =
        this.errorList.isUtf8 =
          false;
    }
  }
  updateNewPasswords() {
    this.submitted = true;
    if (this.resetPwForm.invalid) {
      // this.submitted = false;
      return;
    }
    if (
      !this.errorList.isMinValid ||
      !this.errorList.isNumber ||
      !this.errorList.isSpecial ||
      !this.errorList.isUpper ||
      !this.errorList.isLower ||
      !this.errorList.isUtf8
    ) {
      return;
    }
    let get_expire_otp = JSON.parse(localStorage.getItem(LocalStorageType.OTP));
    if (get_expire_otp == null) {
      this.submitted = false;
      this.toaster.error(
        this.translate.instant(`error_code.changepassword.error_-1`)
      );
      return;
    }
    let date_now = new Date();
    let second = date_now.getUTCSeconds().toString();
    if (parseInt(second) < 10) {
      second = "0" + second;
    }
    let now = parseInt(date_now.getUTCMinutes().toString() + second);
    if (now < parseInt(get_expire_otp.expire)) {
      now += 6000;
    }
    if (now - parseInt(get_expire_otp.expire) >= 540) {
      this.expire_otp = true;
      return;
    }
    this.profileService.confirmNewPassWord(this.user).subscribe((data: any) => {
      if (data.error_code === "00") {
        this.toaster.success(
          this.translate.instant(`error_code.forgot.sussess_${data.error_code}`)
        );
        this.route.navigate(["login"]);
      } else {
        this.submitted = false;
        this.toaster.error(
          this.translate.instant(`error_code.forgot.error_${data.error_code}`)
        );
      }
    });
  }
  clearForm() {
    this.resetPwForm.reset();
  }
  public getLangSetting(langCode: string): any {
    if (langCode === "vi") {
      return this.langSetting[0];
    } else {
      return this.langSetting[1];
    }
  }
  goToLoginPage() {
    this.route.navigateByUrl("login");
  }
}
