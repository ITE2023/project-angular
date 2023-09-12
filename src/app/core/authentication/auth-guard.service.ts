import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
} from "@angular/router";
import { LocalStorageType, SESSION_TIME } from "@core/constants";
import { AuthenticationAndAuthorizationService } from "@core/services";
import * as moment from "moment";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class AuthGuardService implements CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthenticationAndAuthorizationService,
    private dialogRef: MatDialog,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.checkLogin() && this.checkSessionTimeout()) {
      return true;
    }

    this.router.navigate(["login"]);
    return false;
  }

  checkSessionTimeout() {
    const currentTime = moment().toDate().getTime();
    const userInformation = JSON.parse(
      localStorage.getItem(LocalStorageType.UserInformation)
    );

    const loginTime = moment(userInformation.lastLoginDate).toDate().getTime();
    const sessionTime = Number(
      localStorage.getItem(LocalStorageType.ExpiredTime)
    );

    if (currentTime - loginTime > sessionTime * 1000) {
      const remember = localStorage.getItem(LocalStorageType.RememberMe);
      localStorage.clear();
      if (remember != null) {
        localStorage.setItem(LocalStorageType.RememberMe, remember);
      }
      this.dialogRef.closeAll();
      this.authService.clearPermissionAndURLList();
      this.toastr.error(this.translate.instant("session-timeout"));

      return false;
    } else {
      localStorage.setItem(LocalStorageType.SessionTimeOut, currentTime + "");
      return true;
    }
  }
}
