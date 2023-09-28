import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {

  constructor(private http: HttpClient) { }
  getJobPostByUserId(id: string): Observable<any> { 
    return this.http.get(`https://recrutier.duckdns.org/api/jobpost/get-by-user-id?idUser=${id}`);
  }

  getJobPostById(id: string): Observable<any> {
    return this.http.get(`https://recrutier.duckdns.org/api/jobpost/get-by-id?id=${id}`);
  }

  updateJobPost(request: any): Observable<any> {
    const body = {
      id: request.id,
      title: request.title,
      description: request.description,
      salary: request.salary,
      idJobType: request.idJobType,
      expiredAt: request.expiredAt,
      idLocationJobPost: request.idLocationJobPost
    };
    return this.http.put<any>(`https://recrutier.duckdns.org/api/jobpost/update`, request);
  }
}
