import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { UserInfomationModel } from "@core/models";
import { Md5 } from "ts-md5";
import { ConfigService } from "@core/services/configuration/configuration.service";
import { LOGIN_PASSWORD_HASHTAG } from "@core/constants";
@Injectable({
  providedIn: "root",
})
export class UserService {
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

  getUser(body: any, tab): Observable<any> {
    let url = "";
    switch (tab) {
      case 1:
        url = "users/ma/search";
        break;
      case 2:
        url = "users/aa/search";
        break;
      default:
        url = "users/search";
        break;
    }
    return this.http.post(`${this.baseUrl}/${url}`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  changeAvatar(file: File, browserInfo: any): Observable<any> {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("req", JSON.stringify(browserInfo));
    return this.http.post(`${this.baseUrl}/profile/edit-avatar`, formData).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  convertUserListFromObject(data: any[]): UserInfomationModel[] {
    if (!data) {
      return undefined;
    }
    const result = [];
    data.forEach((value: any) => {
      result.push({
        id: value.user_id,
        fullName: value.fullname,
        account: value.username,
        phone: value.phone,
        role: value.department_name,
        department: value.centre_name,
        departmentId: value.centre_id,
        email: value.email,
        address: value.address,
        createdDate: value.createDate,
        status: value.status,
        statusName: value.status_name,
        avatar: value.avatar,
      });
    });
    return result;
  }

  getById(id: string, module): Observable<any> {
    let url = "";
    switch (module) {
      case "ma":
        url = "users/ma/detail";
        break;
      case "aa":
        url = "users/aa/detail";
        break;
      default:
        url = "users/detail";
        break;
    }
    const body: any = {
      user_id: Number(id),
    };
    return this.http.post(`${this.baseUrl}/${url}`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  convertUserFromObject(data: any): UserInfomationModel {
    const result = data
      ? {
          id: data.user_id,
          fullName: data.fullname,
          account: data.username,
          phone: data.phone,
          role: data.role,
          roleId: data.role_id,
          department: data.centre_name,
          email: data.email,
          address: data.address,
          createdDate: data.createDate,
          status: data.status,
          statusName: data.status_name,
          id_number: data.id_number,
          departmentId: data.centre_id,
        }
      : undefined;
    return result;
  }

  updateUser(request: any, module): Observable<any> {
    let url = "";
    switch (module) {
      case "ma":
        url = "users/ma/edit";
        break;
      case "aa":
        url = "users/aa/edit";
        break;
      default:
        url = "users/edit";
        break;
    }
    const body = {
      data: request,
    };
    return this.http.post(`${this.baseUrl}/${url}`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addNewUser(request: any): Observable<any> {
    const body = {
      data: request,
    };
    return this.http.post(`${this.baseUrl}/users/addnew`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  generatePasswordHash(password: string): any {
    const md5 = new Md5();
    return md5.appendStr(password + LOGIN_PASSWORD_HASHTAG).end();
  }

  approveUser(body: any, module): Observable<any> {
    let url = "";
    switch (module) {
      case "ma":
        url = "users/ma/change-status";
        break;
      case "aa":
        url = "users/aa/change-status";
        break;
      default:
        url = "users/approve";
        break;
    }
    return this.http.post(`${this.baseUrl}/${url}`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  active(body: any, module): Observable<any> {
    let url = "";
    switch (module) {
      case "ma":
        url = "users/ma/change-status";
        break;
      case "aa":
        url = "users/aa/change-status";
        break;
      default:
        url = "users/activate";
        break;
    }
    return this.http.post(`${this.baseUrl}/${url}`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getRoleByCentre(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/common/listbox`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  resetPassword(body: any): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/users/reset-user-password`, body)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }
}
