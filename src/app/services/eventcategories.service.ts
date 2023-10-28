import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventcategoriesService {
  private apiUrl = 'http://localhost:8080/api'
  constructor(private http: HttpClient) { }

  getEventCategories() : Observable<any> {
    return this.http.get<[]>(
      this.apiUrl + "/event/categories"
    );
  }
}
