import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { UserInformationModel } from "@core/models";
import {
  AuthenticationAndAuthorizationService,
  ProfileShare,
} from "@core/services";
import { DefaultAvatar, langSettings, LocalStorageType } from "@core/constants";
import { Subscription } from "rxjs";

@Component({
  selector: "ite-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent implements OnInit {
  public langSetting = langSettings;
  subscription: Subscription;
  public langCode;
  public flag: string;
  // tslint:disable-next-line: variable-name
  private _profileImage: string | null = null;
  // tslint:disable-next-line: variable-name
  private _profileName: string | null = null;
  userInformation: UserInformationModel;
  public get profileImage(): string {
    return this._profileImage;
  }
  public get profileName(): string {
    return this._profileName;
  }
  public get defaultAvatar(): string {
    return DefaultAvatar.toString();
  }
  constructor(
    public translate: TranslateService,
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthenticationAndAuthorizationService,
    private profileShareService: ProfileShare
  ) {
    this.subscription = this.profileShareService
      .getProfileInfo()
      .subscribe((profile) => {
        if (profile) {
          this._profileImage = profile.avatarUrl;
          this._profileName = profile.profileName;
        }
      });
  }

  ngOnInit() {
    this.userInformation = this.authService.getUserInformation();
    this._profileImage = this.userInformation.thumbnailPhoto
      ? this.userInformation.thumbnailPhoto
      : DefaultAvatar.toString();
    this._profileName = this.userInformation.userInformation;
    this.flag = this.getLangSetting(this.authService.getCurrentLang()).flag;
  }

  changeLang(lang: string) {
    this.langCode = lang;
    this.flag = this.getLangSetting(this.langCode).flag;
    this.translate.use(lang);
    localStorage.setItem(LocalStorageType.CurrentLanguage, this.langCode);
  }

  public getLangSetting(langCode: string): any {
    if (langCode === "vi") {
      return this.langSetting[0];
    } else {
      return this.langSetting[1];
    }
  }
  redirectProfile() {
    this.router.navigate(["profile"]);
  }

  hideModal() {
    const activatedSidebarItems =
      document.getElementsByClassName("side-nav-activated");
    if (activatedSidebarItems[0] !== undefined) {
      activatedSidebarItems[0].className =
        activatedSidebarItems[0].className.replace(" side-nav-activated", "");
    }

    const activated: HTMLElement = document.querySelector(".app-animation-up");
    if (activated !== undefined) {
      activated.style.display = "none";
    }
  }

  openChangePasswordModal(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "400px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  logOut(): void {
    this.authService.logOut().subscribe((val: any) => {
      if (val) {
        this.router.navigate(["login"]);
      }
    });
  }

  checkPermission(key) {
    return this.authService.checkPermission(key);
  }
}
