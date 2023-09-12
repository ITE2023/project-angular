import { Component, OnInit } from "@angular/core";
import { Validators, FormControl, FormGroup } from "@angular/forms";
import { FormValidators } from "src/app/shared/validators";
import { langSettings, LocalStorageType } from "@core/constants";
import { ProfileService } from "@core/services/app/profile/profile.service";
import { ToastrService } from "ngx-toastr";
import {
  BackgroundLoader,
  AuthenticationAndAuthorizationService,
} from "@core/services";
import { ProfilePassword } from "@core/models/App/profile/profile.model";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { StrengthPassword } from "../../../helper/custom-form-validator/custom-form-validator";

@Component({
  selector: "ite-first-login",
  templateUrl: "./first-login.component.html",
  styleUrls: ["./first-login.component.scss"],
})
export class FirstLoginComponent implements OnInit {
  public langSetting = langSettings;
  public flag: string;
  public langCode = "vi";
  public changePasswordForm: FormGroup;
  public isOldPassword = false;
  public isFirstLogin = false;
  public errorList: any = {
    isMinValid: false,
    isUpper: false,
    isLower: false,
    isSpecial: false,
    isNumber: false,
    isUtf8: false,
  };
  constructor(
    private profileService: ProfileService,
    private toastService: ToastrService,
    private loader: BackgroundLoader,
    private authService: AuthenticationAndAuthorizationService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    const currentPassword = new FormControl("", [Validators.required]);

    const password = new FormControl("", [
      Validators.required,
      // ,
      // FormValidators.passwordStrength
    ]);

    const confirmPassword = new FormControl("", [
      Validators.required,
      FormValidators.equalTo(password),
    ]);

    this.changePasswordForm = new FormGroup({
      currentPassword: currentPassword,
      password: password,
      confirmPassword: confirmPassword,
    });
    if (localStorage.getItem(LocalStorageType.LoginLanguage)) {
      this.changeLang(localStorage.getItem(LocalStorageType.LoginLanguage));
    } else {
      this.changeLang("vi");
    }
  }

  get f() {
    return this.changePasswordForm.controls;
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
  public onUpdate() {
    if (this.changePasswordForm.invalid) {
      return false;
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
    const request: ProfilePassword = {
      old_password: this.changePasswordForm.value.currentPassword,
      new_password: this.changePasswordForm.value.password,
    };

    this.profileService.updatePassword(request).subscribe((data) => {
      if (data.error_code === "06") {
        this.isOldPassword = true;
        this.f.currentPassword.setErrors({ incorrect: true });
        return false;
      } else if (data.error_code === "00") {
        this.cancel(true);
        this.authService.logOut().subscribe(() => {
          this.toastService.success(
            this.getTranslation("profileAccount.validator.successPassword")
          );
          return this.router.navigate(["/login"]);
        });
      }
    });
  }

  cancel(isSuccess) {}

  getTranslation(key) {
    let translation = "";
    this.translateService.get(key).subscribe((data) => {
      translation = data;
    });
    return translation;
  }

  onKeydown(event) {
    const k = event.keyCode;
    if (k === 32) {
      event.preventDefault();
    }
  }
  public getLangSetting(langCode: string): any {
    if (langCode === "vi") {
      return this.langSetting[0];
    } else {
      return this.langSetting[1];
    }
  }
  changeLang(lang: string) {
    localStorage.setItem(LocalStorageType.LoginLanguage, lang);
    this.langCode = lang;
    this.flag = this.getLangSetting(this.langCode).flag;
    this.translateService.use(lang);
  }
  goToLoginPage() {
    this.router.navigateByUrl("login");
  }
}
