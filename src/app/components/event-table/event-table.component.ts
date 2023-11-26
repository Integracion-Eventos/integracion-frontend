import { Component, Input, OnInit } from '@angular/core';
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
  @Input() newevents: any[] = []; 
  events : any[] = [];
  isBuyer: boolean = false;
  isOrganizer: boolean = false;
  
  constructor(private eventService: EventService, private roleGuardService: RoleGuard, private router: Router) { }

  ngOnInit() {
    this.getRole();
  }

  getRole() : void {
    let actualRole = this.roleGuardService.getRole()
    if (actualRole == "ROLE_BUYER"){
      this.isBuyer = true
    } 
    if (actualRole == "ROLE_EMPLOYEE_ADMIN"){
      this.isOrganizer = true
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

  goToEventDetails(eventId: number) {
    if (!isNaN(eventId)) {
      this.router.navigate(['/event/details', eventId]);
    } else {
      // Maneja el caso en el que el valor de eventId no sea un número válido
      console.error('El valor del ID no es un número válido:', eventId);
      // También puedes proporcionar una notificación al usuario sobre el problema
    }
  }


  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete()
    }, 200);
  }
}
