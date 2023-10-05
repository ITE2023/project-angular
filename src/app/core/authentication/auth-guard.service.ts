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
    // this.router.navigate(["login"]);
    window.location.href= "http://localhost:2004/login";
    return false;
  }

  checkSessionTimeout() {
    const userInformation = JSON.parse(
      localStorage.getItem(LocalStorageType.UserInformation)
    );

    if(userInformation.role == "admin" || userInformation.role =="recruiter") {
      return true;
    }else
    {
      return false;
    }
  }
}
