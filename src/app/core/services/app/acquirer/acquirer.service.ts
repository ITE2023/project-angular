import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class AcquirerService {
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
    return this.http.post(`${this.baseUrl}payment-method/search`, body).pipe(
      map((data: any) => {
        // fake
        data.list_data = [
          {
            acquirer_code: "ACQ_01",
            biz_name: "THB1",
            full_name: "Trần Hòa Bình",
            status: "Active",
            create_date: "02/05/2020",
          },
          {
            acquirer_code: "ACQ_02",
            biz_name: "THB2",
            full_name: "Hòa Bình",
            status: "Active",
            create_date: "03/05/2020",
          },
          {
            acquirer_code: "ACQ_03",
            biz_name: "THB3",
            full_name: "Bình Vnua",
            status: "Inactive",
            create_date: "04/05/2020",
          },
          {
            acquirer_code: "ACQ_04",
            biz_name: "THB4",
            full_name: "Trần VNUA",
            status: "PendingApproval",
            create_date: "05/05/2020",
          },
          {
            acquirer_code: "ACQ_05",
            biz_name: "THB5",
            full_name: "Trần Bình",
            status: "Rejected",
            create_date: "06/05/2020",
          },
        ];
        data.total_record = 2;
        //
        return data;
      })
    );
  }

  getPMbyId(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}payment-method/detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  update(type: string, body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}payment-method/` + type, body).pipe(
      map((data: any) => {
        // fake
        data.error_code = "00";
        //
        return data;
      })
    );
  }

  getBankList(): Observable<any> {
    const body = {
      key: "PaymentMethod",
    };
    return this.http.post(`${this.baseUrl}common/listbox`, body).pipe(
      map((data: any) => {
        data.list_data = [
          {
            id: 1,
            value: "MBBank",
          },
          {
            id: 2,
            value: "VCB",
          },
          {
            id: 3,
            value: "VPBank",
          },
          {
            id: 4,
            value: "HSBC",
          },
        ];
        return data;
      })
    );
  }
}
