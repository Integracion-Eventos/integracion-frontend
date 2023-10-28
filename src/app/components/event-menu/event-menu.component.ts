import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-menu',
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.scss'],
})
export class EventMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirectToCreation(){
    this.router.navigate(['/create-event'])
  }
}
