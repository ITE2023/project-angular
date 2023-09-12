import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class TransactionChannelService {
  baseUrl = "";

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl =
      (this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : '') + "/transaction/channel/";
  }

  getList(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getChannelById(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  update(type: string, request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}` + type, request).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  active(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}active`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  approval(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}approve`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
