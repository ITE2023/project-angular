import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class RiskManagementService {
  baseUrl = "";

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : '';
  }

  // Giao dịch nghi ngờ
  getTransaction(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/transaction/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getRisk(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getNationList(): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/risk/get-list-country-code`, {})
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getMCCList(): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/get-list-mcc`, {}).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addNew(browserInfo: any, file?: any): Observable<any> {
    const formData = new FormData();
    formData.append("req", JSON.stringify(browserInfo));
    if (file) {
      formData.append("file", file);
    }
    return this.http.post(`${this.baseUrl}/risk/addnew`, formData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  edit(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/edit`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  delete(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/delete`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  active(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/change-status`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getHistory(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/get-history-log`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  validateCard(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/check-valid-card`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
