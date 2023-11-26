import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'http://localhost:8080/api'

  constructor(private http: HttpClient) {}

  sendPurchase(PurchasePayalDTO : any) : Observable<any>{
    return this.http.post<any>(
      this.apiUrl + '/paypal/tickets/purchase',
      PurchasePayalDTO
    )
  }

  getPurchaseByUserID(userId : any) : Observable<any>{
    return this.http.get<[]>(
      this.apiUrl + '/purchases/user/' + userId
    )
  }


}
