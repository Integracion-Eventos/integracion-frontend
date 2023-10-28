import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SeatingModalComponent } from '../seatingmodal/seatingmodal.component';
import { EventService } from 'src/app/services/event.service';
import { RoleGuard } from 'src/app/services/roleguard';
import { EventcategoriesService } from 'src/app/services/eventcategories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-creation',
  templateUrl: './event-creation.component.html',
  styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent implements OnInit {
  eventData: any = {
    event_name: '',
    event_description: '',
    event_date: '',
    event_location: '',
    image: null,
    event_category_name: '',
    employee_id: '',
    hasSeating: true,
    tickets: [],
  };
  vipTickets: number = 0;
  generalTickets: number = 0;
  seatsCount: number = 0;
  vipPrice: number = 0;
  generalPrice: number = 0;
  categories: any[] = []; // Asegúrate de que la propiedad 'categories' esté declarada  
  seatingData: any;
  allSeats: any[] = []; // Mantén una lista de todos los asientos disponibles
  eventCategories: any[] = [];
  canCreateEvent: boolean = false;
  today = new Date().toISOString();
  selectedFile: File | undefined;

  constructor(private eventCategoriesService: EventcategoriesService, private modalController: ModalController,private roleService: RoleGuard, private eventService: EventService) {}

  ngOnInit() {
    this.allSeats = this.generateSeatsData(this.seatsCount, []);
    this.seatingData = {
      seatsData: this.allSeats, // Usa la lista de asientos completa
      categories: this.categories,
    };
    this.getEventCategories()
    this.eventData.event_date = new Date().toISOString(); // Asigna la fecha actual en formato ISO 8601

  }

  async presentSeatingModal(maxSeats: number) {
    if (maxSeats <= 0) {
      return;
    }
  
    const selectedSeats = this.eventData.tickets.map((ticket: any) => ticket.seatAssignment);
  
    // Filtrar asientos disponibles
    const availableSeats = this.generateSeatsData(maxSeats, selectedSeats);
  
    const modal = await this.modalController.create({
      component: SeatingModalComponent,
      componentProps: {
        seatingData: {
          seatsData: availableSeats,
          categories: this.categories,
        },
      },
    });
  
    modal.onDidDismiss().then((data) => {
      const selectedSeats: any[] = data.data;
      selectedSeats.forEach((seat) => {
        const category = seat.category;
        this.eventData.tickets.push({
          type: category,
          name: `Asiento ${category === 'VIP' ? 'VIP' : 'General'} ${seat.seatNumber}`,
          price: category === 'VIP' ? this.vipPrice : this.generalPrice,
          hasSeatAssignment: true,
          seatAssignment: `A${seat.seatNumber}`,
        });
  
        // Filtrar asientos disponibles nuevamente después de la selección
        const updatedSelectedSeats = this.eventData.tickets.map((ticket: any) => ticket.seatAssignment);
        const updatedAvailableSeats = this.generateSeatsData(maxSeats, updatedSelectedSeats);
        this.seatingData = {
          seatsData: updatedAvailableSeats,
          categories: this.categories,
        };
      });
    });
  
    return await modal.present();
  }
  resetSeats() {
    this.allSeats.forEach((seat: any) => {
      seat.selected = false;
    });
    this.eventData.tickets = []; // Limpia los asientos asignados
  }

  filterTicketsByType(type: string) {
    return this.eventData.tickets.filter((ticket: any) => ticket.type === type);
  }
  generateSeatsData(seatsCount: number, selectedSeats: any[]) {
    const allSeats = Array.from({ length: seatsCount }, (_, index) => index + 1);
    const availableSeats = allSeats.filter(seat => !selectedSeats.includes(`A${seat}`)).map(seat => {
      return { seatNumber: seat, type: 'Default' };
    });
    return availableSeats;
  }

  
  isSeatSelected(seatNumber: number, selectedSeats: any[]) {
    for (let i = 0; i < selectedSeats.length; i++) {
      if (selectedSeats[i].includes(`A${seatNumber}`)) {
        return true;
      }
    }
    return false;
  }

  
  createEvent() {
    this.eventData.employee_id = this.roleService.getId();
    console.log('Evento creado:', this.eventData);
  
    const formData = new FormData();
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
  
    if (this.eventData.hasSeating) {
      formData.append('eventCreationDTO', new Blob([JSON.stringify(this.eventData)], {
        type: 'application/json'
      }));
  
      this.eventService.createEvent(formData).subscribe((data) => {
        console.log(data);
      });
    } else {
      const allTickets = [];
  
      for (let i = 0; i < this.vipTickets; i++) {
        allTickets.push({
          type: 'VIP',
          name: 'VIP Ticket ' + i,
          price: this.vipPrice,
        });
      }
  
      for (let i = 0; i < this.generalTickets; i++) {
        allTickets.push({
          type: 'General',
          name: 'General Ticket ' + i,
          price: this.generalPrice,
        });
      }
  
      this.eventData.tickets = allTickets;
      console.log('Tickets creados sin asientos:', allTickets);
  
      formData.append('eventCreationDTO', new Blob([JSON.stringify(this.eventData)], {
        type: 'application/json'
      }));
  
      this.eventService.createEvent(formData).subscribe((data) => {
        console.log(data);
      });
    }
  }

  getSelectedSeatsCount(category: string): number {
    return this.eventData.tickets.filter((ticket: any) => ticket.type === category).length;
  }

  onSeatingChange() {
    if (this.eventData.hasSeating) {
    } else {
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.eventData.image = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  validateTickets() {
    if (this.vipTickets + this.generalTickets > this.seatsCount) {
      console.error('La cantidad total de tickets excede la cantidad de asientos disponibles.');
    }
  }

  async getEventCategories() : Promise<any> {
    this.eventCategories = await this.eventCategoriesService.getEventCategories().toPromise();
    console.log(this.eventCategories)
  }

  areAllFieldsFilled() {
    return (
      this.eventData.event_name &&
      this.eventData.event_description &&
      this.eventData.event_date &&
      this.eventData.event_location &&
      this.eventData.image &&
      this.eventData.event_category_name &&
      this.seatsCount &&
      this.vipPrice &&
      this.generalPrice)
  }
  
  onInputChange() {
    this.canCreateEvent = this.areAllFieldsFilled();
  }

}
