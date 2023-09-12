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
export class StatebankService {
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

  getTopWalletList(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account-report`, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getTransactionReportList(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/transaction-report`, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getVolatilityReportList(request: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/account-volatility-report`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getCurrentWalletBalanceReport(): Observable<any> {
    const body = {};
    return this.http.post(`${this.baseUrl}/bank-report-real-time`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getMonthWalletBalanceReport(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/bank-report`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
