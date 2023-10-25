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

  registerBuyer(buyerRegistrationDTO: any): Observable<any> {
    return this.http.post<boolean>(
      this.apiUrl + '/buyer/register',
      buyerRegistrationDTO
    );
  }

  registerOrganizer(organizerRegisterDTO: any): Observable<any>{
    return this.http.post<boolean>(
      this.apiUrl + '/organizer/register',
      organizerRegisterDTO
    )
  }

  checkUsername(username: string): Observable<any>{
    return this.http.get<boolean>(
      this.apiUrl + '/user/check/' + username 
    )
  }
}
