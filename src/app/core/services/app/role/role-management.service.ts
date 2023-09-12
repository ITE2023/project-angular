import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class RoleManagementService {
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

  getRoleList(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}role/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addRole(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}role/addnew`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  editRole(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}role/edit`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deleteRole(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}role/delete`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // danh sách chức năng
  getFunctionList(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}role/list_function`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  // cấu hình chức năng
  addFunction(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}role/config`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
