import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoleGuard } from './roleguard';
import { Observable, forkJoin, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  private apiUrl = 'http://localhost:8080/api'

  constructor(private http: HttpClient, private roleguard: RoleGuard) { }

  getOrganizerById(organizerId: String){
    let dataRequest: Observable<any> = of(null); 
    dataRequest = this.http.get<any>(`${this.apiUrl}/organizer/${organizerId}`);
    return forkJoin([dataRequest]).pipe(
      map(([data]) => {
        return {
          data: data,
        };
      })
    );
  }
}
