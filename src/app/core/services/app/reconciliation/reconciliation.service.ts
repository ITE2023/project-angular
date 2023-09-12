import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

export const RECONCILE_PROCESS_STATUS = [
  {
    value: "01",
    desc: "Chưa xử lý",
  },
  {
    value: "02",
    desc: "Đã xử lý",
  },
  {
    value: "00",
    desc: "Không xử lý",
  },
];

@Injectable({
  providedIn: "root",
})
export class ReconciliationService {
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

  getReconcileIssuerList(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}reconcile/issuer/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getReconcileIssuerDetail(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}reconcile/issuer/detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getReconcileIssuerRefundDetail(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}reconcile/issuer/refund/detail`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  editReconcileIssuer(files, body: any): Observable<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("reconcileIssuerUpdateFile", file.file, file.name);
    });
    formData.append("req", JSON.stringify(body));
    return this.http
      .post(`${this.baseUrl}reconcile/issuer/update`, formData)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getReconcileMerchantList(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}reconcile/merchant/search`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getReconcileMerchantDetail(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}reconcile/merchant/detail`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getListDataByIssuer(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}common/listbox`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getReconcileIssuerReport(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}reconcile/issuer/report/search`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getReconcileMerchantReport(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}reconcile/merchant/report/search`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getReconcileMerchantRefundDetail(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}reconcile/merchant/refund/detail`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  editReconcileMerchant(files, body: any): Observable<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("reconcileUpdateFile", file.file, file.name);
    });
    formData.append("req", JSON.stringify(body));
    return this.http
      .post(`${this.baseUrl}reconcile/merchant/update`, formData)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
