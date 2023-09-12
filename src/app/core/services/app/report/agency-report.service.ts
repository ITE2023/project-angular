import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@core/services/configuration/configuration.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgencyReportService {
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

  public getReportCT17Lists(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/agency/ctt17`, body);
  }

  public getReportCT18Lists(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/agency/ctt18`, body);
  }

  public getReportCT19Lists(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/agency/ctt19`, body);
  }

  public getReportCT20Lists(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/agency/ctt20`, body);
  }
}
