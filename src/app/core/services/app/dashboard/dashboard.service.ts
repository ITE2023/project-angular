import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
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

  getTopTrans(rq: any) {
    return this.http.post(`${this.baseUrl}/top-transactions`, rq).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getWalletScale(body: any) {
    return this.http.post(`${this.baseUrl}/status-statistics`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getNewestTransaction(body: any) {
    return this.http
      .post(`${this.baseUrl}/latest-payment-dashboard`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getBusinessToday(body: any) {
    return this.http
      .post(`${this.baseUrl}dashboard/business/result`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getRevenue(body: any) {
    return this.http
      .post(`${this.baseUrl}dashboard/aggregate/revenue`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getTop10ByTransactionAmount(body: any) {
    return this.http
      .post(`${this.baseUrl}statistic/merchant/transaction`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getTop10ByTransactionValue(body: any) {
    return this.http
      .post(`${this.baseUrl}statistic/merchant/transaction/amount`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
