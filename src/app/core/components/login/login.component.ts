import { Component, OnInit, AfterViewInit } from "@angular/core";
import {
  BackgroundLoader,
  BrowserAndLocationInformationService,
  AuthenticationAndAuthorizationService,
} from "@core/services";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  LocalStorageType,
  CommonErrorCode,
  langSettings,
} from "@core/constants";
import { TranslateService } from "@ngx-translate/core";
import { MatDialog } from "@angular/material/dialog";
import { ChangePasswordComponent } from "@core/layout/topbar/change-password/change-password.component";
import { NotificationDialogComponent } from "../notification-dialog/notification-dialog.component";

@Component({
  selector: "ite-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, AfterViewInit {
  public user = {
    userName: "",
    password: "",
    remember_me: false,
  };
  public langSetting = langSettings;
  public submitted = false;
  public model: any = {};
  public loginForm: FormGroup;
  public flag: string;
  public returnUrl;
  public showPw = false;
  public isChecked = false;
  public commonErrorCode = CommonErrorCode;
  public apiError = false;
  public errorCode = "";

  constructor(
    private loader: BackgroundLoader,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthenticationAndAuthorizationService,
    protected browserInfoService: BrowserAndLocationInformationService,
    public fb: FormBuilder,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || "/";
    //this.authService.logOut();
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      remember_me: [""],
    });
    if (localStorage.getItem(LocalStorageType.RememberMe)) {
      let jsonObject = JSON.parse(
        localStorage.getItem(LocalStorageType.RememberMe)
      );
      this.isChecked = true;
      this.loginForm = this.fb.group({
        username: [jsonObject.acc, Validators.required],
        password: [jsonObject.pass, Validators.required],
        remember_me: [this.isChecked],
      });
    }
  }

  ngOnInit() {
    if (this.authService.checkLogin()) {
      this.route.navigateByUrl(this.returnUrl);
      return;
    }
    this.authService.logOut();
    if (localStorage.getItem(LocalStorageType.LoginLanguage)) {
      this.changeLang(localStorage.getItem(LocalStorageType.LoginLanguage));
    } else {
      this.changeLang("vi");
    }
  }

  ngAfterViewInit(): void {
    this.loader.hide();
  }

  setValue(e) {
    this.loginForm.value.remember_me = e.target.checked;
  }

  get f() {
    return this.loginForm?.controls;
  }

  saveInfoRemember(isChecked: boolean = false) {
    if (isChecked) {
      let inforRemember = {
        acc: this.loginForm.value.username,
        pass: this.loginForm.value.password,
      };
      localStorage.setItem(
        LocalStorageType.RememberMe,
        JSON.stringify(inforRemember)
      );
      return;
    }
    localStorage.removeItem(LocalStorageType.RememberMe);
    return;
  }

  onSubmit() {
    this.apiError = false;
    const form = this.loginForm.value;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .doLogin(form.username.trim(), form.password.trim())
      .subscribe((data: any) => {
        this.loader.hide();
        const config = this.authService.getSideBarConfig();
        let url;
        if (config && config.length) {
          const child = config[0].children;
          if (child) {
            url = this.authService.getUrlFromId(child[0].menu_id);
          } else {
            url = this.authService.getUrlFromId(config[0].menu_id);
          }
          localStorage.setItem(LocalStorageType.DefaultUrl, url);
        }
        if (typeof data.error_message !== "string") {
          // đổi mật khẩu lần đầu
          if (data.is_change_password === 1) {
            this.route.navigate(["change-password-login"]);
            return;
          }
          // đổi mật khẩu định kỳ sau 90 ngày
          if (data.notification_code == "01") {
            setTimeout(() => {
              this.dialog.open(NotificationDialogComponent, {
                width: "500px",
                disableClose: true,
                data: {
                  change_password_period: true,
                  day: data.day,
                },
              });
            }, 1000);
          }
          this.saveInfoRemember(form.remember_me);
          this.route.navigateByUrl(url);
        } else {
          this.apiError = true;
          this.errorCode = data.error_code;
        }
      });
  }

  focusEvent() {
    this.apiError = false;
  }

  changeLang(lang: string) {
    localStorage.setItem(LocalStorageType.LoginLanguage, lang);
    this.flag = this.getLangSetting(lang).flag;
    this.translate.use(lang);
    if (lang === "vi") {
      this.translate.use("vi");
    } else {
      this.translate.use("en");
    }
  }

  public getLangSetting(langCode: string): any {
    if (langCode === "vi") {
      return this.langSetting[0];
    } else {
      return this.langSetting[1];
    }
  }

  register() {
    this.route.navigate(["forgot-password"]);
  }

  redirect() {
    this.route.navigate(["forgot-password"]);
  }

  togglePw() {
    this.showPw = !this.showPw;
    if (this.showPw) {
      setTimeout(() => {
        this.showPw = false;
      }, 2000);
    }
  }

  openChangePasswordModal(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: "400px",
      disableClose: true,
    });
    dialogRef.componentInstance.isFirstLogin = true;
    dialogRef.afterClosed().subscribe((result) => {});
  }

  enter($event) {
    this.loginForm.markAllAsTouched();
    this.onSubmit();
    $event.preventDefault();
  }
}
