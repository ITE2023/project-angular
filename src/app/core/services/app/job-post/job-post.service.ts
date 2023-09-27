import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobPostService {

  constructor(private http: HttpClient) { }
  getJobPostByUserId(id: string): Observable<any> {
    console.log(id);  
    return this.http.get(`https://recrutier.duckdns.org/api/jobpost/get-by-user-id?idUser=${id}`);
  }
}
