import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  constructor(private http: HttpClient) { }
  getJobTypeAll(): Observable<any> { 
    return this.http.get(`http://210.211.99.111:15001/recruiter/jobtype/get-all`);
  }
}
