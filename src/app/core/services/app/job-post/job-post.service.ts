import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {

  constructor(private http: HttpClient) { }
  getJobPostByUserId(id: string): Observable<any> { 
    return this.http.get(`http://210.211.99.111:15001/recruiter/jobpost/get-by-user-id?idUser=${id}`);
  }

  getJobPostById(id: string): Observable<any> {
    return this.http.get(`http://210.211.99.111:15001/recruiter/jobpost/get-by-id?id=${id}`);
  }

  updateJobPost(request: any): Observable<any> {
    return this.http.put<any>(`http://210.211.99.111:15001/recruiter/jobpost/update`, request);
  }
  addJobPost(request: any): Observable<any> {
    return this.http.post<any>(`http://210.211.99.111:15001/recruiter/jobpost/add`, request);
  }
  deleteJobPost(id: string): Observable<any> {
    return this.http.delete<any>(`http://210.211.99.111:15001/recruiter/jobpost/delete?id=${id}`);
  }
}
