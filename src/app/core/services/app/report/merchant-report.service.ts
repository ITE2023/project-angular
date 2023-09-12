import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@core/services/configuration/configuration.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantReportService {
  baseUrl = "";

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.baseUrl =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : '';
  }

  public getReportCT05Lists(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/merchant/ctt05`, body);
  }
  public getReportCT05ALists(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/merchant/ctt05a`, body);
  }
  public getReportCT07Lists(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/merchant/ctt07`, body);
  }
  public getReportCT07ALists(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/merchant/ctt07a`, body);
  }
  public getReportCT08Lists(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/merchant/ctt08`, body);
  }
  public getReportCT09Lists(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/merchant/ctt09`, body);
  }
}
