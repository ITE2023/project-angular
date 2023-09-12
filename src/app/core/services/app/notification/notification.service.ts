import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  public isChangeInPage: BehaviorSubject<any> = new BehaviorSubject<boolean>(
    false
  );
  public isChangeInPopup: BehaviorSubject<any> = new BehaviorSubject<boolean>(
    false
  );
  public isReadInPopup: BehaviorSubject<any> = new BehaviorSubject<boolean>(
    false
  );

  baseUrl = "";

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl =
      (this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : "") + "/";
  }

  public getNotification(body) {
    return this.http.post(`${this.baseUrl}notifications/get-all`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public getById(id): Observable<any> {
    const body = {
      id: id,
    };
    return this.http.post(`${this.baseUrl}notifications/detail`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  public getNewestNotification(body): Observable<any> {
    return this.http.post(`${this.baseUrl}notifications/get-new`, body);
  }

  public markAllAsRead(): Observable<any> {
    return this.http.post(`${this.baseUrl}notifications/read-all`, {});
  }

  public markAsReadOrUnread(body): Observable<any> {
    return this.http.post(`${this.baseUrl}notifications/read`, body);
  }

  public delete(body): Observable<any> {
    return this.http.post(`${this.baseUrl}notifications/delete`, body);
  }

  // khi read/unread/delete ở page thì ảnh hưởng đến popup
  public getChangeInPage(): Observable<any> {
    return this.isChangeInPage.asObservable();
  }

  public setChangeInPage(data: any) {
    this.isChangeInPage.next(data);
  }

  // khi read ở popup thì ảnh hưởng đến page
  public getChangeInPopup(): Observable<any> {
    return this.isChangeInPopup.asObservable();
  }

  public setChangeInPopup(data: any) {
    this.isChangeInPopup.next(data);
  }

  // khi read ở popup thì thay đổi số lượng thông báo và navigate đến trang tương ứng
  public getReadInPopup(): Observable<any> {
    return this.isReadInPopup.asObservable();
  }

  public setReadInPopup(data: any) {
    this.isReadInPopup.next(data);
  }

  public getUrl(item) {
    let url = "";
    switch (item.target) {
      case "MERCHANT":
      case "MERCHANT_CONFIG_FEE": {
        url = "/admin/merchant/detail/";
        break;
      }
      case "AGENCY":
      case "AGENCY_CONFIG_FEE": {
        url = "/admin/agency/detail/";
        break;
      }
      case "ISSUER":
      case "ISSUER_CONFIG_FEE": {
        url = "/admin/issuer/detail/";
        break;
      }
      case "PAYMENT_METHOD": {
        url = "/admin/payment-method/detail/";
        break;
      }
      case "USER": {
        url = "/admin/user/detail/mm/";
        break;
      }
      case "FEE_PRIORITY": {
        url = "/admin/fee/priority/detail/";
        break;
      }
      case "FEE_MERCHANT": {
        url = "/admin/fee/merchant";
        break;
      }
      case "FEE_AGENCY": {
        url = "/admin/fee/agency";
        break;
      }
    }
    if (url !== "/admin/fee/merchant" && url !== "/admin/fee/agency") {
      url += item.target_id;
    } else {
      url += "?page=1&size=10&data_type=wait&tab=1";
    }
    return url;
  }
}
