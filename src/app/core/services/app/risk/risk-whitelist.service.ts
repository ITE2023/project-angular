import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class RiskWhiteListService {
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

  getRisk(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/white-list/search`, body).pipe(
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

  addNew(browserInfo: any, file?: any): Observable<any> {
    const formData = new FormData();
    formData.append("req", JSON.stringify(browserInfo));
    if (file) {
      formData.append("file", file);
    }
    return this.http
      .post(`${this.baseUrl}/risk/white-list/addnew`, formData)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  edit(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/white-list/edit`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  delete(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/risk/white-list/delete`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  active(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/risk/white-list/change-status`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getHistory(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/risk/white-list/get-history-log`, body)
      .pipe(
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
