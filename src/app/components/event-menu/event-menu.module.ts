import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EventMenuComponent } from './event-menu.component';
import { EventTableComponent } from '../event-table/event-table.component';
import { EventMenuRoutingModule } from './event-menu-routing.module';
import { SeatingModalComponent } from '../seatingmodal/seatingmodal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventMenuRoutingModule
  ],
  declarations: [EventMenuComponent, EventTableComponent, SeatingModalComponent], // Asegúrate de declarar EventTableComponent aquí
})
export class EventMenuModule { }
