import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-table',
  templateUrl: './event-table.component.html',
  styleUrls: ['./event-table.component.scss'],
})
export class EventTableComponent  implements OnInit {
  events : any[] = [];
  
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEventsAvailable();
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
