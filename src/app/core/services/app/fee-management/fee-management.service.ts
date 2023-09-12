import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class FeeManagementService {
  baseUrl = '';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl =
      (this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : '') + "/";
  }

  // template fee
  getFeeList(body: any, reference): Observable<any> {
    return this.http.post(`${this.baseUrl}fee/${reference}/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateFee(type: string, reference, body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}fee/${reference}/` + type, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  approval(body: any, reference): Observable<any> {
    return this.http.post(`${this.baseUrl}fee/${reference}/approve`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getFeeById(feeId: number, reference): Observable<any> {
    const body = {
      id: feeId,
    };
    return this.http.post(`${this.baseUrl}fee/${reference}/detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // list of fee-method, charge-type...
  feeListBox(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}fee/general/listbox`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  calculateFee(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}fee/merchant/calculate`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // priority fee
  getObjectList(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}fee/priority/get-object-value`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  lockPriorityFee(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}fee/priority/block`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
