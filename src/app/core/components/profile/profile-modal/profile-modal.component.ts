import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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

@Component({
  selector: "ite-profile-modal",
  templateUrl: "./profile-modal.component.html",
  styleUrls: ["./profile-modal.component.scss"],
})
export class ProfileModalComponent implements OnInit {
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

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      full_name: this.fb.control("", [
        Validators.required,
        FormValidators.nameSpace,
      ]),
      username: this.fb.control({ value: "", disabled: true }),
      email: this.fb.control("", [
        Validators.required,
        Validators.pattern(EMAIL_REGEX),
      ]),
      address: this.fb.control({ value: "" }),
      phone: this.fb.control("", [
        Validators.required,
        Validators.pattern(PHONE_REGEX),
      ]),
      // language: this.fb.control(""),
    });
    if (Object.keys(this.user).length > 0) {
      this.profileForm.patchValue(this.user);
    }
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
