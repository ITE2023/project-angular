import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JobPostLocationService {
  constructor(private http: HttpClient) { }

  getJobPostLocationById(id: string): Observable<any> {
    return this.http.get(`http://210.211.99.111:15001/recruiter/jobpostlocation/get-by-id?id=${id}`);
  }

  updateJobPostLocation(request: any): Observable<any> {
    return this.http.put<any>(`http://210.211.99.111:15001/recruiter/jobpostlocation/Update`, request);
  }

  addJobPostLocation(request: any): Observable<any> {
    return this.http.post<any>(`http://210.211.99.111:15001/recruiter/jobpostlocation/add`, request);
  }
  deleteJobPostLocation(id: string): Observable<any> {
    return this.http.delete<any>(`http://210.211.99.111:15001/recruiter/jobpostlocation/delete?id=${id}`);
  }
}
