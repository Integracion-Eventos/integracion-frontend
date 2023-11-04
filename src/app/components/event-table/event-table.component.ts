import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { RoleGuard } from 'src/app/services/roleguard';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss'],
})
export class EventTableComponent  implements OnInit {
  events : any[] = [];
  isBuyer: boolean = false;
  
  constructor(private eventService: EventService, private roleGuardService: RoleGuard, private router: Router) { }

  ngOnInit() {
    this.getEventsAvailable();
    this.getRole();
  }

  getRole() : void {
    let actualRole = this.roleGuardService.getRole()
    if (actualRole == "ROLE_BUYER"){
      this.isBuyer = true
    }
  }

  buyTickets(eventId: number) {
    if (!isNaN(eventId)) {
      this.router.navigate(['/purchase', eventId]);
    } else {
      // Maneja el caso en el que el valor de eventId no sea un número válido
      console.error('El valor del ID no es un número válido:', eventId);
      // También puedes proporcionar una notificación al usuario sobre el problema
    }

  }

  
  getEventsAvailable(): void {
    this.eventService.getAvailableEvents().subscribe((data: any) => {
      this.events = data;
      console.log(this.events); // Asegúrate de quitar esto en la versión de producción
    });
  }

  onIonInfinite(ev: any) {
    this.getEventsAvailable();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete()
    }, 200);
  }
}
