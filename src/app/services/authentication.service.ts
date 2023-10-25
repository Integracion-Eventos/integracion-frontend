import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }


  private apiUrl = 'http://localhost:8080/api'

  authenticateUser(userAuthDTO: any): Observable<any> {
    return this.http.post<boolean>(
        this.apiUrl + '/auth/login',
        userAuthDTO
    );
  }


}
