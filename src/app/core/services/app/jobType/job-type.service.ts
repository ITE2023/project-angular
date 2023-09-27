import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  constructor(private http: HttpClient) { }
  getJobTypeAll(): Observable<any> { 
    return this.http.get(`https://recrutier.duckdns.org/api/jobtype/get-all`);
  }
}
