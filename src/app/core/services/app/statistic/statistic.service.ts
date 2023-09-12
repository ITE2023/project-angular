import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigService } from "@core/services/configuration/configuration.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class StatisticService {
  baseUrl = "";

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl =
      (this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : "") + "/";
  }

  getDataCircleChart(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}status-statistics`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getTransactionAmountChart(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}statistic/merchant/transaction`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getTransactionValueChart(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}statistic/merchant/transaction/amount`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getMerchantStatusChart(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}statistic/merchant/status`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getMerchantRevenueChart(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}statistic/aggregate/revenue`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getTransactionChart(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}statistic/transaction/quantity`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getErrorCodeChart(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}statistic/service/error`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
