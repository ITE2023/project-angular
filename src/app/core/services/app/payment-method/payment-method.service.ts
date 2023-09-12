import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class PaymentMethodService {
  baseUrl = "";

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl =
      (this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : '') + "/";
  }

  getList(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}payment-method/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getPMbyId(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}payment-method/detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updatePM(type: string, request: any): Observable<any> {
    const body = {
      method: request,
    };
    return this.http.post(`${this.baseUrl}payment-method/` + type, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  active(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}payment-method/active`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  approval(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}payment-method/approve`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  changeLogo(file: File, browserInfo: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("req", JSON.stringify(browserInfo));
    return this.http
      .post(`${this.baseUrl}payment-method/edit-logo`, formData)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  sort(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}payment-method/index`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
