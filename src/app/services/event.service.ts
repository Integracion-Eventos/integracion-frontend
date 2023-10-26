import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }


  getAvailableEvents() : Observable<any> {
    return this.http.get<[]>(
      this.apiUrl + '/events/available'
    );
  }

}
