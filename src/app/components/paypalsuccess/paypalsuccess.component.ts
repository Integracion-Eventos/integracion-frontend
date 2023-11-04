import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paypalsuccess',
  templateUrl: './paypalsuccess.component.html',
  styleUrls: ['./paypalsuccess.component.scss'],
})
export class PaypalsuccessComponent  implements OnInit {
  paymentId: string = '';
  token: string = '';
  PayerID: string = '';
  constructor(private route: ActivatedRoute,
     private router: Router,
     private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paymentId = params['paymentId'];
      this.token = params['token'];
      this.PayerID = params['PayerID'];

      const url = `http://localhost:8080/api/paypal/tickets/purchase/success?paymentId=${this.paymentId}&token=${this.token}&PayerId=${this.PayerID}`;

      this.http.post(url, {}).subscribe(
        (response: any) => {
            console.log('Respuesta del servidor:', response);
            if (response === 'Payment success') {
            } else {
            }
        },
        (error) => {
            console.error('Error al realizar la solicitud POST:', error);
            if (error.status === 500) {
            } else {
            }
        }
    );
    
      this.router.navigate(['/']);
        
      
    });
  }

}
