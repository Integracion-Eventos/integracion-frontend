import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventdetailsService } from 'src/app/services/eventdetails.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent  implements OnInit {

  evento_dict : any = {
  }

  constructor(private eventdetails: EventdetailsService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getEventDetailsById(params['id'])
    }
    ); 
  }

  getEventDetailsById(eventId: String){
    this.eventdetails.getEventDetailsById(eventId).subscribe((data) => {
      this.evento_dict = data;
    });
  }
}
