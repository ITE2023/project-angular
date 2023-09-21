import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { BackgroundLoader, ProfileShare } from "@core/services";
import { ProfileService } from "@core/services/app/profile/profile.service";
import { LocalizeService } from "@core/localization";
import {
  CommonErrorCode,
  PHONE_REGEX,
  LocalStorageType,
  EMAIL_REGEX,
} from "@core/constants";
import { UserInformationModel } from "@core/models";
import { FormValidators } from "src/app/shared/validators";
import { ProfileModalComponent } from "../profile-modal/profile-modal.component";
interface Food {
  value: number;
  viewValue: string;
}
export const confirmPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirm = control.get('confirmPassword');
  return newPassword && confirm && newPassword.value === confirm.value ? null : { 'passwordMismatch': true };
};
@Component({
  selector: 'ite-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {
  public user: any;
  public profileForm: FormGroup;
  public isLoading: boolean;
  public commonErrorCode = CommonErrorCode;
  public languageList = [];
  @ViewChild("phone") phone;

  constructor(
    private profile: ProfileShare,
    public dialogRef: MatDialogRef<ProfileModalComponent>,
    private localizeService: LocalizeService,
    private profileService: ProfileService,
    private loader: BackgroundLoader,
    private toastService: ToastrService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.user = this.data?.profile;
    this.languageList = this.data?.langs;
  }
  foods: Food[] = [
    {value: 1, viewValue: 'male'},
    {value: 2, viewValue: 'female'},
  ];
  ngOnInit(): void {
    this.profileForm = this.fb.group({
      oldPassword: this.fb.control("", [
        Validators.required,
        Validators.pattern(PHONE_REGEX),
      ]),
      newPassword: this.fb.control("", [
        Validators.required,
        Validators.pattern(PHONE_REGEX),
      ]),
      confirmPassword: this.fb.control("", [
        Validators.required,
        Validators.pattern(PHONE_REGEX),
      ]),
    });
  }

  get f() {
    return this.profileForm.controls;
  }

  cancel(isSuccess) {
    this.dialogRef.close(isSuccess);
  }

  getUserInformation(): UserInformationModel {
    return JSON.parse(localStorage.getItem(LocalStorageType.UserInformation));
  }

  public onSubmit() {
    if (this.profileForm.valid) {
      let request = Object.assign({}, this.profileForm.value);
      request.full_name = request.full_name.trim();
      this.profileService.updateProfile(request).subscribe((result) => {
        // if (result.error_code === "00") {
        this.cancel(true);
        const message = this.localizeService.instant(
          "profileAccount.validator.success"
        );
        const currentUser = this.getUserInformation();
        if (currentUser) {
          this.profile.setProfileInfo(
            currentUser.thumbnailPhoto,
            this.profileForm.value.fullname
          );
          currentUser.displayName = this.profileForm.value.fullname;
          localStorage.setItem(
            LocalStorageType.UserInformation,
            JSON.stringify(currentUser)
          );
        }
        this.toastService.success(message);
        // } else if (result.error_code === "11") {
        //   this.f.phone.setErrors({ exist: true });
        //   this.phone.nativeElement.focus();
        // } else {
        //   this.toastService.error(result.error_message);
        // }
      });
    }
  }

  enter($event) {
    this.profileForm.markAllAsTouched();
    this.onSubmit();
    $event.preventDefault();
  }
}
