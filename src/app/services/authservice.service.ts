import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = 'http://localhost:8080/api'

  constructor(private http: HttpClient) { }

  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return of(false);
    }
    return this.http.post<boolean>(
      `${this.apiUrl}/jwt/verify`,
      { token: token }
    );
  }

}
