import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class IssuerService {
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

  getIssuer(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}issuer/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getIssuerById(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}issuer/detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateIssuer(type: string, file: File, browserInfo: any): Observable<any> {
    const formData = new FormData();
    formData.append("logo", file);
    formData.append("req", JSON.stringify(browserInfo));
    return this.http.post(`${this.baseUrl}issuer/` + type, formData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateContractInfo(files, browserInfo: any): Observable<any> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("contract_image", file.file, file.name);
    });
    formData.append("req", JSON.stringify(browserInfo));
    return this.http.post(`${this.baseUrl}issuer/edit-contract`, formData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updatePaymentMethod(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}issuer/payment-method`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  approval(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}issuer/approve`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  active(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}issuer/active`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  changeLogo(file: File, browserInfo: any): Observable<any> {
    const formData = new FormData();
    formData.append("logo", file);
    formData.append("req", JSON.stringify(browserInfo));
    return this.http.post(`${this.baseUrl}issuer/edit-logo`, formData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  editLimitedAmount(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}issuer/edit-limited-amount`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
