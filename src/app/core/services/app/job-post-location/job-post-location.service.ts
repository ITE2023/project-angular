import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JobPostLocationService {
  constructor(private http: HttpClient) { }

  getJobPostLocationById(id: string): Observable<any> {
    return this.http.get(`https://recrutier.duckdns.org/api/jobpostlocation/get-by-id?id=${id}`);
  }

  updateJobPostLocation(request: any): Observable<any> {
    return this.http.put<any>(`https://recrutier.duckdns.org/api/jobpostlocation/Update`, request);
  }
}
