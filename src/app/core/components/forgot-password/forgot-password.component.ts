import { Component, OnInit } from "@angular/core";
import { langSettings, LocalStorageType } from "@core/constants";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SuccessDialogComponent } from "./success-dialog/success-dialog/success-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { CommonErrorCode } from "@core/constants";
import { ProfileService } from "@core/services/app/profile/profile.service";

@Component({
  selector: "ite-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  public langSetting = langSettings;
  public resetForm: FormGroup;
  public langCode = "vi";
  public commonErrorCode = CommonErrorCode;
  public flag: string;
  public errorForm: string;
  submitted = false;
  isValid = true;
  constructor(
    public translate: TranslateService,
    private profileService: ProfileService,
    private route: Router,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      email: this.fb.control("", [Validators.required]),
    });
    if (localStorage.getItem(LocalStorageType.LoginLanguage)) {
      this.changeLang(localStorage.getItem(LocalStorageType.LoginLanguage));
    } else {
      this.changeLang("vi");
    }
  }

  changeLang(lang: string) {
    localStorage.setItem(LocalStorageType.LoginLanguage, lang);
    this.langCode = lang;
    this.flag = this.getLangSetting(this.langCode).flag;
    this.translate.use(lang);
    if (typeof this.errorForm != "undefined" && this.submitted) {
      this.validateEPAndShowMessageError();
    }
  }
  resetPasswords(email: string) {
    this.submitted = true;
    if (this.resetForm.invalid) {
      this.addError();
      return;
    }
    if (email != null && email.trim() != "") {
      this.submitted = false;
      this.profileService
        .confirmResetPws({
          contact: email,
        })
        .subscribe((res) => {
          if (res.ref_id != null) {
            this.openChangePasswordModal(res.ref_id);
          } else {
            this.submitted = true;
            this.addError(res.error_code);
          }
        });
      return;
    }
  }
  get f() {
    return this.resetForm?.controls;
  }
  isValidEmail(email: string): boolean {
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regexp.test(email);
  }
  isValidPhone(phone: string): boolean {
    if (phone.length < 10 || phone.length > 11) {
      return false;
    }
    return true;
  }
  validateEPAndShowMessageError(error_code: string = null): string {
    let emailorPhone = this.resetForm.get("email").value;
    let isValid: any;
    if (emailorPhone?.trim() === "") {
      return this.getTranslation("error.require");
    }
    isValid = this.isValidEmail(emailorPhone);
    if (!isValid) {
      return this.getTranslation("error.format-email-invalid");
    }
    return this.getTranslation(`error_code.forgot.error_${error_code}`);
    // if(isNaN(emailorPhone as any)){
    //   isValid=this.isValidEmail(emailorPhone);
    //   if(!isValid){
    //     return this.getTranslation('error.format-email-invalid');
    //   }
    //   return this.getTranslation('error.email-invalid');
    // }else{
    //   isValid=this.isValidPhone(emailorPhone);
    //   if(!isValid){
    //     return this.getTranslation('error.format-phone-invalid');
    //   }
    //   return this.getTranslation('error.phone-invalid');
    // }
  }
  openChangePasswordModal(ref_id: string): void {
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      let date = new Date();
      let second = date.getUTCSeconds().toString();
      if (date.getUTCSeconds() < 10) {
        second = "0" + second;
      }
      let expire_otp = {
        expire: date.getUTCMinutes().toString() + second,
        email: this.resetForm.get("email").value,
      };
      localStorage.setItem(LocalStorageType.OTP, JSON.stringify(expire_otp));
      this.route.navigate(["reset-password"]);
      sessionStorage.setItem("guid_mm", ref_id);
    });
  }
  addError(error_code: string = null) {
    this.errorForm = this.validateEPAndShowMessageError(error_code);
  }
  public getLangSetting(langCode: string): any {
    if (langCode === "vi") {
      return this.langSetting[0];
    } else {
      return this.langSetting[1];
    }
  }
  getTranslation(key): string {
    this.translate.get(key).subscribe((data) => {
      this.errorForm = data;
    });
    return this.errorForm;
  }
  goToLoginPage() {
    this.route.navigateByUrl("login");
  }
}
