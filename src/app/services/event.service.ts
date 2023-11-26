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

  getEvent(id : any) : Observable<any> {
    return this.http.get<[]>(
      this.apiUrl + '/events/' + id
    );
  }

  createEvent(EventCreationDTO:any) : Observable<any> {
    return this.http.post<[]>(
      this.apiUrl + '/event/register',
      EventCreationDTO
    );
  }
  getPopularEvents() : Observable<any>{
    return this.http.get<[]>(
      this.apiUrl + '/events/popular'
    )
  }

  getIncomingEvents() : Observable<any>{
    return this.http.get<[]>(
      this.apiUrl + '/event/incoming'
    )
  }

  getEventsByCategory(category : any) : Observable<any>{
    return this.http.get<[]>(
      this.apiUrl + '/events/category/' + category
    )
  }

  getSearchedEvents(search : any) : Observable<any>{
    return this.http.get<[]>(
      this.apiUrl + '/events/search/' + search
    )
  }

  getEventsByDate(dateStart : any, dateEnd : any) : Observable<any>{
    return this.http.get<[]>(
      this.apiUrl + '/events/date/' + dateStart + '/' + dateEnd
    )
  }
}


