import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-incoming-events',
  templateUrl: './incoming-events.component.html',
  styleUrls: ['./incoming-events.component.scss'],
})
export class IncomingEventsComponent  implements OnInit {

  incomingEvents: any[] = []

  constructor(private eventService:EventService) { }

  ngOnInit() {
    this.getIncomingEvents()
  }


  async getIncomingEvents() : Promise<void> {
    this.incomingEvents = await this.eventService.getAvailableEvents().toPromise()
  
  }

}
