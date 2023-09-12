import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { UserInfomationModel } from "@core/models";
import { Md5 } from "ts-md5";
import { ConfigService } from "@core/services/configuration/configuration.service";
import { LOGIN_PASSWORD_HASHTAG } from "@core/constants";
@Injectable({
  providedIn: "root",
})
export class WalletService {
  baseUrl = "";
  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : "";
  }

  getWalletList(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account-search`, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getWalletById(walletId: any): Observable<any> {
    const request = {
      ewallet_id: walletId,
    };
    return this.http.post(`${this.baseUrl}/account-detail`, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  block(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit-status`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
