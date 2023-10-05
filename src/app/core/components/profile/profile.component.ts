import { Component, OnInit } from "@angular/core";
import {
  AuthenticationAndAuthorizationService,
  CommonService,
  ProfileShare,
} from "../../services";
import { UserInformationModel } from "@core/models";
import { DefaultAvatar, LocalStorageType } from "@core/constants";
import { MatDialog } from "@angular/material/dialog";
import { ProfileModalComponent } from "./profile-modal/profile-modal.component";
import { ChangeAvatarModalComponent } from "./change-avatar-modal/change-avatar-modal.component";
import { ChangePasswordComponent } from "@core/layout/topbar/change-password/change-password.component";
import { ProfileService } from "@core/services/app/profile/profile.service";
import { Profile } from "@core/models/App/profile/profile.model";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { ChangePasswordModalComponent } from "./change-password-modal/change-password-modal.component";

@Component({
  selector: "ite-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  defaultLang: any;
  user: any;
  // public profile: Profile;
  public profile: any;

  // tslint:disable-next-line: variable-name
  private _profileImage: string | null = null;
  userInformation: UserInformationModel;
  langs = [];
  language = "";
  history = [];
  isSeeMore = false;
  page = 1;
  pageSize = 5;
  subscription: Subscription;
  idUser: any;
  constructor(
    private userService: AuthenticationAndAuthorizationService,
    private profileService: ProfileService,
    public dialog: MatDialog,
    private profileShareService: ProfileShare,
    private toastr: ToastrService,
    private translateService: TranslateService,
    public authService: AuthenticationAndAuthorizationService,
    private commonService: CommonService
  ) {
    this.user = this.userService.getUserInformation();
    this.idUser = JSON.parse(localStorage.getItem(LocalStorageType.UserInformation));
    console.log(this.idUser);
    this.subscription = this.profileShareService
      .getProfileInfo()
      .subscribe((profile) => {
        if (profile) {
          this._profileImage = profile.avatarUrl;
        }
      });
  }

  ngOnInit() {
    this.getDetailProfile();
    // this.profile = {
    //   firstName: "Hải",
    //   lastName: "Nguyễn Văn",
    //   username: "Hung Nguyen",
    //   phone: "0335483669",
    //   email: "hung@gmail.com",
    //   gender: 1
    // };
    this.language = "Việt Nam";
  }

  public get profileImage(): string {
    return this._profileImage;
  }

  public get defaultAvatar(): string {
    return DefaultAvatar.toString();
  }

  public getDetailProfile() {
    // this.loader.show();
    this.profileService.getUserById(this.idUser.id).subscribe((data) => {
      this.profile = data.data;
      console.log(this.profile);
    });
  }

  public editProfile(): void {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: "400px",
      disableClose: true,
      data: {
        profile: this.profile,
        langs: this.langs,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.page = 1;
        this.history = [];
        this.isSeeMore = false;
        this.getDetailProfile();
      }
    });
  }

  public editPassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, {
      width: "400px",
      disableClose: true,
      data: {
        id: this.profile.id,
        langs: this.langs,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.page = 1;
        this.history = [];
        this.isSeeMore = false;
        this.getDetailProfile();
      }
    });
  }

  public openChangeImg(): void {
    const dialogRef = this.dialog.open(ChangeAvatarModalComponent, {
      data: {
        userId: this.user.id,
        avatar: this.profile.avatar ? this.profile.avatar : this.defaultAvatar,
      },
      width: "500px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.userInformation = this.userService.getUserInformation();
      this._profileImage = this.userInformation.thumbnailPhoto;
      if (result) {
        this.getDetailProfile();
        this.toastr.success(this.getTranslation("changeimage.message.success"));
      }
    });
  }

  public openChangePasswordModal() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "400px",
      data: { userId: 15 },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  public getHistory(num: number) {
    const body = {
      page: num,
      size: this.pageSize,
    };
    this.profileService.getActivityHistory(body).subscribe((data) => {
      if (data.error_code === "00") {
        this.history = this.history.concat(data.list_data);
        this.isSeeMore = this.history.length < data.total_record;
      }
    });
  }

  public seeMore() {
    this.page++;
    this.getHistory(this.page);
  }

  getTranslation(key) {
    return this.translateService.instant(key);
  }

  checkPermission(key) {
    return this.authService.checkPermission(key);
  }

  multiLangData(str) {
    return this.commonService.multiLangData(str);
  }
}
