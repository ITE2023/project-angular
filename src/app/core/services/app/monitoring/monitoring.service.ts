import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '@core/services/configuration/configuration.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
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

  // data giám sát dịch vụ
  getTableDataService(body: any) {
    return this.http.post(`${this.baseUrl}monitoring/service`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // data giám sát hệ thống
  getTableDataSystem(body: any) {
    return this.http.post(`${this.baseUrl}monitoring/system`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }


  // danh sách khoảng thời gian
  getPeriodList(body: any) {
    return this.http.post(`${this.baseUrl}dashboard/aggregate/revenue`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
