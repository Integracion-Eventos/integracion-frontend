import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-controller',
  templateUrl: './menu-controller.component.html',
  styleUrls: ['./menu-controller.component.scss', '../../app.component.scss'],
})
export class MenuControllerComponent  implements OnInit {

  constructor(private menuController: MenuController) { }

  ngOnInit() {

  }

  openMenu() {

  }

  navigateToEventos(){

  }

  navigateToPerfil(){}
}
