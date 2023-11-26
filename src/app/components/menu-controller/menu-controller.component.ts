import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { RoleGuard } from 'src/app/services/roleguard';

@Component({
  selector: 'app-menu-controller',
  templateUrl: './menu-controller.component.html',
  styleUrls: ['./menu-controller.component.scss', '../../app.component.scss'],
})
export class MenuControllerComponent  implements OnInit {
  isBuyer: boolean = false;

  constructor(private authRole:RoleGuard, private menuController: MenuController, private router: Router) { }

  async ngOnInit() {
    let actualRole = this.authRole.getRole();
    if (actualRole == 'ROLE_BUYER') {
      this.isBuyer = true;
    }
  }
  

  openMenu() {

  }

  navigateToEventos(){
    this.router.navigate(['/events'])
    this.menuController.close() 
  }

  navigateToPrincipal(){
    this.router.navigate(['/'])
    this.menuController.close()
  }

  navigateToPerfil(){
    this.router.navigate(['/profile'])
    this.menuController.close()
  }

  navigateToOrganizer(){
    this.router.navigate(['/organizer'])
    this.menuController.close()
  }

  navigateToCompras(){
    this.router.navigate(['/purchases'])
    this.menuController.close()
  }
}
