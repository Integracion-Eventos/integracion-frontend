import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';
import { EventcategoriesService } from 'src/app/services/eventcategories.service';
import { RoleGuard } from 'src/app/services/roleguard';

@Component({
  selector: 'app-event-menu',
  templateUrl: './event-menu.component.html',
  styleUrls: ['./event-menu.component.scss'],
})
export class EventMenuComponent implements OnInit {

  isBuyer: boolean = false;
  isEmployeeAdmin: boolean = false;
  isEmployeeEvent: boolean = false;
  events: any[] = [];
  searchTerm: string = "";
  selectedCategory: string = "";
  categories: any[] = [];
  startDate: string = "";
  endDate: string = "";


  constructor(private authRole: RoleGuard,
     private router: Router,
     private eventService: EventService,
     private categoriesService: EventcategoriesService,
     private toastController: ToastController) { }

  ngOnInit() {  
    let actualRole = this.authRole.getRole();
    if (actualRole == 'ROLE_BUYER') {
      this.isBuyer = true;
    } else if (actualRole == 'ROLE_EMPLOYEE_ADMIN'){
      this.isEmployeeAdmin = true;
    } else if (actualRole == 'ROLE_EMPLOYEE_EVENT'){
      this.isEmployeeEvent = true;
    }
    this.getEvents();
    this.getCategories();
  }

  async getCategories() : Promise<void> {
    this.categories = await this.categoriesService.getEventCategories().toPromise();
  }
  redirectToCreation(){
    this.router.navigate(['/create-event'])
  }

  getEvents() {
    if (this.searchTerm !== "") {
      this.eventService.getSearchedEvents(this.searchTerm).subscribe(
        (data) => {
          this.events = data;
        }
      );
    } else if (this.selectedCategory !== "") {
      this.eventService.getEventsByCategory(this.selectedCategory).subscribe(
        (data) => {
          this.events = data;
        }
      );
    } else {
      this.eventService.getAvailableEvents().subscribe(
        (data) => {
          this.events = data;
        }
      );
    }
  }
  searchEvents(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;

    this.searchTerm = filterValue; 
    if (this.searchTerm !== "") {
      this.eventService.getSearchedEvents(this.searchTerm).subscribe((data) => {
        this.events = data;
      });
    } else {
      this.getEvents();
    }
  }
  
  onCategoryChange(event: any) {
    const selectedCategoryId = event.target.value;
    this.selectedCategory = selectedCategoryId;
    if (selectedCategoryId !== "") {
      this.eventService.getEventsByCategory(selectedCategoryId).subscribe((data) => {
        this.events = data;
        if (this.events.length === 0) {
          this.presentToast();
          this.getEvents();
        }
      });
    } else {
      this.getEvents();
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'No hay eventos disponibles en esta categoría.',
      duration: 2000
    });
    toast.present();
  }
  clearSelection() {
    this.selectedCategory = ""; 
    this.getEvents();
  }

  searchEventsByDateRange() {
    if (this.startDate !== "" && this.endDate !== "") {
      this.eventService.getEventsByDate(this.startDate, this.endDate).subscribe((data) => {
        this.events = data;
        if (this.events.length === 0) {
          this.presentToast();
          this.getEvents();
        }
      });
    } else {
      this.getEvents();
    }
  }
  
  
  
}
