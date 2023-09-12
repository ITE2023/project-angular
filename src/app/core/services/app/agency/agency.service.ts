import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class AgencyService {
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
    return this.http.post(`${this.baseUrl}agency/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getAgencyById(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}agency/detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  update(type: string, request: any): Observable<any> {
    const body = {
      agency: request,
    };
    return this.http.post(`${this.baseUrl}agency/` + type, body).pipe(
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
    return this.http.post(`${this.baseUrl}agency/edit-contract`, formData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateAccountInfo(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}agency/edit-pay-info`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  active(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}agency/activate`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  approval(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}agency/approve`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getAddress(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}common/address`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // cập nhật phương thức trả phí
  updateFeeMethod(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}agency/renew-fee-method`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
