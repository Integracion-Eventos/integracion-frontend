import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleGuard } from './roleguard';
import { Observable, forkJoin, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api'

  constructor(private http: HttpClient, private roleguard: RoleGuard) { }

  getUserById(): Observable<any> {

    const userId = this.roleguard.getId();
    const role = this.roleguard.getRole();

    let userRequest = this.http.get<any>(`${this.apiUrl}/user/${userId}`);

    let dataRequest: Observable<any> = of(null); 

    if (role == "ROLE_BUYER") {
      dataRequest = this.http.get<any>(`${this.apiUrl}/buyer/${userId}`);
    } else if (role == "ROLE_EMPLOYEE_ADMIN" || role == "ROLE_EMPLOYEE_EVENT") {
      dataRequest = this.http.get<any>(`${this.apiUrl}/employee/${userId}`);
    }

    return forkJoin([userRequest, dataRequest]).pipe(
      map(([user, data]) => {
        return {
          user: user,
          data: data,
          role: role
        };
      })
    );
  }
}
