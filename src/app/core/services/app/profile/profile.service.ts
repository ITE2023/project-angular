import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
  ProfileResponse,
  ProfileRequest,
  ProfilePassword,
} from "@core/models/App/profile/profile.model";
import { map } from "rxjs/operators";
import { Md5Help } from "@core/helper/md5/md5-helper";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  baseUrl = "";
  baseUrl2 = "";

  constructor(private http: HttpClient, private config: ConfigService) {
    this.baseUrl =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.AUTH_API_URL
        : "";
    this.baseUrl2 =
      this.config &&
      this.config.config &&
      this.config.config.API_ENDPOINTS &&
      this.config.config.API_ENDPOINTS.NO_AUTH_API_URL
        ? this.config.config.API_ENDPOINTS.NO_AUTH_API_URL
        : "";
  }


  updateProfile(request: any): Observable<any> {
    return this.http.put<ProfileResponse>(`http://210.211.99.111:15040/api/users/update-user`, request);
  }

  updatePassword(request: ProfilePassword): Observable<ProfileResponse> {
    return this.http.put<ProfileResponse>(
      'http://210.211.99.111:15040/api/oauths/change-password',request
    );
  }
  confirmResetPws(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl2}/forgot-password`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getLanguageList(): Observable<any> {
    const body = {
      key: "language",
    };
    return this.http.post(`${this.baseUrl}/common/listbox`, body).pipe(
      map((data: any) => {
        if (data.list_data) {
          data.list_data.map((i) => (i.des = "languageList." + i.des));
        }
        return data;
      })
    );
  }

  getActivityHistory(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/actions`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  confirmNewPassWord(body: any): Observable<any> {
    var dataInput = {
      ref_id: body.ref_id,
      otp: Md5Help.md5(body.otp),
      new_password: Md5Help.md5(body.new_password),
    };
    return this.http.post(`${this.baseUrl2}/confirm-password`, dataInput).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`http://210.211.99.111:15040/api/users/get-user?idUser=${id}`);
  }
}
