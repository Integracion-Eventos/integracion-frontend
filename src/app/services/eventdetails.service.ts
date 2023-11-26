import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleGuard } from './roleguard';

@Injectable({
  providedIn: 'root'
})
export class EventdetailsService {
  private microserviceUrl = 'http://localhost:5000'
  constructor(private http: HttpClient, private roleguard: RoleGuard) {

  }

  getEventDetailsById(eventId: String){
    return this.http.get<any>(`${this.microserviceUrl}/events/${eventId}`);
  }
}
