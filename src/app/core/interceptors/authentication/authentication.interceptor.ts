import { map, catchError } from "rxjs/operators";

import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { LocalStorageType, SIGNATURE_KEY } from "@core/constants";
import {
  BrowserAndLocationInformationService,
  AuthenticationAndAuthorizationService,
} from "@core/services";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { Location } from "@angular/common";
import { ConfigService } from "@core/services/configuration/configuration.service";
import { Md5 } from "ts-md5";
import { TranslateService } from "@ngx-translate/core";

import * as CryptoJS from "crypto-js";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  private configAPI: any;
  private ignoreAPI: string[] = [];
  constructor(
    private router: Router,
    private authService: AuthenticationAndAuthorizationService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public location: Location,
    public config: ConfigService,
    private translate: TranslateService
  ) {
    this.configAPI =
      this.config.config && this.config.config.API_ENDPOINTS
        ? this.config.config.API_ENDPOINTS
        : "";
    this.ignoreAPI = [];
    for (const item in this.configAPI) {
      if (!["NO_AUTH_API_URL", "AUTH_API_URL", "SKIP_LOADER"].includes(item)) {
        this.ignoreAPI.push(this.configAPI.AUTH_API_URL + this.configAPI[item]);
      }
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(LocalStorageType.Token);

    const browserInfo = BrowserAndLocationInformationService.getInfo();
    if (!browserInfo.ip_address || browserInfo.ip_address === "undefined") {
      browserInfo.ip_address = "118.70.124.48";
    }
    let newRequest;

    if (!accessToken) {
      let dateTime = `${Date.now()}`;
      let accessCode = "u9jf30f0394gh83340";
      // btoa() dung de hashBase64 from a binary string

      let digest = btoa(unescape(encodeURIComponent(JSON.stringify(req.body))));

      // let digest = btoa(JSON.stringify(req.body));
      let hashField = "date-time,access-code,digest";

      const secretKey = "oIKDWN8fwjojOmdwo62nNfw";
      let inputSignature = `date-time=${dateTime}&access-code=${accessCode}&digest=${digest}`;

      let headers = req.headers;

      headers = headers
        .append("Cache-Control", "no-cache")
        .append("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        .append("X-Requested-With", "XMLHttpRequest")
        .append("Access-Control-Allow-Origin", "*")
        .append("Cache-Control", "no-store")
        .append("Expires", "0")
        .append("Pragma", "no-cache")
        .append( "Content-Type", "application/json; charset=UTF-8");
      newRequest = req.clone({
        headers: headers,
        body: {
          ...req.body,
          device: browserInfo.device,
          ip_address: browserInfo.ip_address,
        },
      });
    } else {
      let dateTime = `${Date.now()}`;
      let accessCode = "u9jf30f0394gh83340";
      // btoa() dung de hashBase64 from a binary string
      let digest = btoa(unescape(encodeURIComponent(JSON.stringify(req.body))));

      // let digest = btoa(JSON.stringify(req.body));
      let hashField = "date-time,access-code,digest";

      const secretKey = "oIKDWN8fwjojOmdwo62nNfw";
      let inputSignature = `date-time=${dateTime}&access-code=${accessCode}&digest=${digest}`;
      let outputSignature = this.hashValueSHA256(inputSignature, secretKey);

      let headers = req.headers.set(
            "Authorization",
            "Bearer " + accessToken
          );
          headers = headers
            .append("Cache-Control", "no-cache")
            .append(
              "Access-Control-Allow-Methods",
              "POST, GET, OPTIONS"
            )
            .append("Access-Control-Allow-Origin", "*")
            .append("Cache-Control", "no-store")
            .append("Expires", "0")
            .append("Pragma", "no-cache");
          newRequest = req.clone({
            headers,
            body: req.body,
          });
    }
    return next.handle(newRequest).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 302) {
          this.clear();
          this.authService.logOut();
          this.router.navigate(["login"]);
        }
        // timeout
        // if (error.status === 401 && !req.url.includes("login")) {
        //   if (error.error?.error_code === "77") {
        //     this.toastr.error("Invalid Signature");
        //   } else {
        //     this.clear();
        //     this.authService.logOut();
        //     this.toastr.error(this.translate.instant("session-timeout"));
        //     this.router.navigate(["login"]);
        //   }
        // }
        // if (error.status === 403 && !req.url.includes("login")) {
        //   this.dialog.closeAll();
        //   this.toastr.clear();
        //   this.router.navigate(["error-403"]);
        //   // this.toastr.error(this.translate.instant("function-role"));
        // }
        return throwError(error);
      })
    );
  }

  hashValue(body: any, token?: string): string {
    const hashValue =
      JSON.stringify(body) + SIGNATURE_KEY + (token ? token : "");
    const md5 = new Md5();
    return md5.appendStr(hashValue).end().toString();
  }

  hashValueSHA256(value: any, key?: string): string {
    return CryptoJS.HmacSHA256(value, key).toString();
  }

  hashValueString(body: string, token?: string): string {
    const hashValue = body + SIGNATURE_KEY + (token ? token : "");
    const md5 = new Md5();
    return md5.appendStr(hashValue).end().toString();
  }

  clear() {
    let remember = null;
    if (localStorage.getItem(LocalStorageType.RememberMe)) {
      remember = localStorage.getItem(LocalStorageType.RememberMe);
    }
    localStorage.clear();
    if (remember != null) {
      localStorage.setItem(LocalStorageType.RememberMe, remember);
    }
    this.dialog.closeAll();
    this.toastr.clear();
  }
}
