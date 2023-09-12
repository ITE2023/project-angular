import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class UnitManagementService {
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
  getUnit(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}centre/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getUnitById(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}centre/detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateUnit(type: string, request: any): Observable<any> {
    const body = {
      data: request,
    };
    return this.http.post(`${this.baseUrl}centre/` + type, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  active(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}centre/active`, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
