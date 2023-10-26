import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { EventTableComponent } from '../components/event-table/event-table.component';
import { HomePageRoutingModule } from './home-routing.module';
import { MenuControllerComponent } from '../components/menu-controller/menu-controller.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, EventTableComponent, MenuControllerComponent]
})
export class HomePageModule {}
