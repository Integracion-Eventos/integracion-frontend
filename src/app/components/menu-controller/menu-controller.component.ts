import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-controller',
  templateUrl: './menu-controller.component.html',
  styleUrls: ['./menu-controller.component.scss', '../../app.component.scss'],
})
export class MenuControllerComponent  implements OnInit {

  constructor(private menuController: MenuController, private router: Router) { }

  async ngOnInit() {
 
  }

  openMenu() {

  }

  navigateToEventos(){

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
}
