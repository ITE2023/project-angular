import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ConfigService } from "@core/services/configuration/configuration.service";

@Injectable({
  providedIn: "root",
})
export class DropdownDataService {
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
  getDropdownData(dataName: string) {
    const body = {
      key: dataName,
    };
    return this.http.post(`${this.baseUrl}/common/listbox`, body).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
