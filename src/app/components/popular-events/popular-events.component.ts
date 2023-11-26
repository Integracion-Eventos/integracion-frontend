import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-popular-events',
  templateUrl: './popular-events.component.html',
  styleUrls: ['./popular-events.component.scss'],
})
export class PopularEventsComponent  implements OnInit {

  popularevents: any[] = []
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getPopularEvents()
    console.log(this.popularevents)
  }


  async getPopularEvents() : Promise<any> {
    this.popularevents = await this.eventService.getPopularEvents().toPromise()
    console.log(this.popularevents)
  }

}
