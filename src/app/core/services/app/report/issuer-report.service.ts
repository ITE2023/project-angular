import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@core/services/configuration/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class IssuerReportService {
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

  public reportCT01(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/issuer/ctt01`, body);
  }
  public reportCT01A(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/issuer/ctt01a`, body);
  }
  public reportCT02(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/issuer/ctt02`, body);
  }
  public reportCT03(body): Observable<any> {
    return this.http.post(`${this.baseUrl}/report/issuer/ctt03`, body);
  }

  public paginate(data, page, pageSize) {
    return data?.slice((page - 1)*pageSize, page*pageSize)
  }
}
