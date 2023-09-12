import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class TransactionManager {
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

  // transaction payment
  public getTransactionPayment(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment`, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public getDetailTransactionPayment(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment-details`, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public refund(request): Observable<any> {
    return this.http.post(`${this.baseUrl}refund/mm`, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // transaction refund
  public getTransactionRefund(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/search-refund`, request);
  }

  public getDetailTransactionRefund(request): Observable<any> {
    return this.http.post(`${this.baseUrl}/refund-details`, request);
  }

  // Đã gửi yêu cầu cho TCPH --> Thành công/Không thành công
  public importFile(file, browserInfo: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("req", JSON.stringify(browserInfo));
    return this.http.post(`${this.baseUrl}refund/update-status-file`, formData);
  }

  public updateTransactionStatus(request): Observable<any> {
    return this.http.post(
      `${this.baseUrl}refund/update-status-single`,
      request
    );
  }

  // Đã ghi nhận của ĐVCNTT --> Đã gửi yêu cầu cho TCPH
  public importFileIssuer(file, browserInfo: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("req", JSON.stringify(browserInfo));
    return this.http.post(
      `${this.baseUrl}refund/send-issuer/update-status-file`,
      formData
    );
  }

  public updateTransactionStatusIssuer(request): Observable<any> {
    return this.http.post(
      `${this.baseUrl}refund/send-issuer/update-status-single`,
      request
    );
  }

  public approveRefund(request): Observable<any> {
    return this.http.post(`${this.baseUrl}refund/mm/confirm`, request);
  }

  //Transaction POS
  public getTransactionPaymentPOS(request): Observable<any> {
    return this.http
      .post(`${this.baseUrl}report/get-transaction-pos-statement`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
  public getTransactionPaymentRealtimePOS(request): Observable<any> {
    return this.http
      .post(`${this.baseUrl}report/get-transaction-pos-realtime`, request)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  public getListTerminal(request): Observable<any> {
    return this.http.post(`${this.baseUrl}sub-merchant/listbox`, request);
  }
}
