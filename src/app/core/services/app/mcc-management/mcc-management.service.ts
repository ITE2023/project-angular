import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class MCCManagementService {
  baseUrl: string = "";

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
    return this.http.post(`${this.baseUrl}mcc/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getGroupList(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}mcc/group/search`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getStatusList(): Observable<any> {
    const body = {
      key: "mcc_status",
    };
    return this.http.post(`${this.baseUrl}mcc/get-list-status`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getMCCToAdd(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}mcc/get-list`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  addMCCToGroup(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}mcc/group/add-mcc`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateGroupMCC(type: string, request: any): Observable<any> {
    const body = {
      data: request,
    };
    return this.http.post(`${this.baseUrl}mcc/group/` + type, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  getMCCToDelete(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}mcc/group/get-list-mcc`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deleteMCC(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}mcc/group/remove-mcc`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  active(type: string, body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}mcc/group/` + type, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
