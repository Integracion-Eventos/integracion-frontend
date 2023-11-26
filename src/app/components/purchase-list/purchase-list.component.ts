import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';
import { RoleGuard } from 'src/app/services/roleguard';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss'],
})
export class PurchaseListComponent  implements OnInit {
  purchases: any[] = [];

  constructor(private authRole: RoleGuard, private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.getPurchases();
  }

  async getPurchases(): Promise<void> {
    let userId = this.authRole.getId();
    try {
      this.purchases = await this.purchaseService.getPurchaseByUserID(userId).toPromise();
    } catch (error) {
      console.error("Error al obtener las compras:", error);
    }
  }

}
