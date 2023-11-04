import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { RoleGuard } from 'src/app/services/roleguard';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-purchase-tickets',
  templateUrl: './purchase-tickets.component.html',
  styleUrls: ['./purchase-tickets.component.scss'],
})
export class PurchaseTicketsComponent  implements OnInit {
  eventId: number | null = null;
  eventData: any;
  purchaseData: any = {
    currency: "USD",
    description: "",
    hasSeating: false,
    tickets_id: [],
    userId: "",
    eventId: 0,
    ticketType: "",
    quantity: 0
  }
  tickets: any[] = []; 
  selectedTickets: any[] = [];
  ticketRows: any[][] = [];
  hasSeating: boolean = false;
  ticketType: string = '';
  ticketCount: any;
  maxTickets: number = 0;
  
  constructor(
    private roleguardService: RoleGuard, 
    private route:ActivatedRoute, 
    private eventService:EventService, 
    private ticketsService:TicketService,
    private purchaseService:PurchaseService,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.eventId = id ? +id : null;
    });
   this.getEvent(this.eventId)
    this.getTickets(this.eventId)

  }
  async getEvent(eventId : any) : Promise<void> {
    const response = await this.eventService.getEvent(eventId).toPromise();
    this.eventData = response;
    console.log(this.eventData);
  }
  
  toggleSelection(ticket: any) {
    if (ticket.isSelected) {
      const index = this.selectedTickets.findIndex(
        (selectedTicket) => selectedTicket.id === ticket.id
      );
      if (index > -1) {
        this.selectedTickets.splice(index, 1);
      }
    } else {
      this.selectedTickets.push(ticket.id);
    }
    ticket.isSelected = !ticket.isSelected;
  }
  get ticketLabel(): string {
    return this.ticketType === 'VIP' ? 'Ticket VIP:' : 'Ticket General:';
  }

  // Método para manejar cambios en la cantidad de tickets
  handleTicketCountChange(): void {
    if (this.ticketCount > this.maxTickets) {
      this.ticketCount = this.maxTickets;
    }
  }
  purchaseTickets() {
    this.purchaseData.description = "Comprando Tickets para " + this.eventData.event_name
    this.purchaseData.hasSeating = this.hasSeating
    this.purchaseData.userId = this.roleguardService.getId(); 
    this.purchaseData.eventId = this.eventId   
    if (this.hasSeating) {
    this.purchaseData.tickets_id = this.selectedTickets
    } else {
      this.purchaseData.ticketType = this.ticketType
      this.purchaseData.quantity = this.ticketCount
    }
    console.log(this.purchaseData)
      this.purchaseService.sendPurchase(this.purchaseData).subscribe((response) => {
        if (response && response[1] && response[1].href) {
          const approvalUrl = response[1].href;
          window.location.href = approvalUrl;
        } else {
          console.error('La respuesta de compra no contiene la URL de aprobación esperada.');
        }
      })
  }

  async getTickets(eventId: any): Promise<void> {
    this.tickets = await this.ticketsService.getTicketsForEvent(eventId).toPromise();
    if (
      this.tickets.length > 0 &&
      this.tickets.some((ticket: any) => ticket.hasSeatAssignment)
      ) {
      this.hasSeating = true
      // Ordenar los tickets por número de asiento de manera ascendente
      this.tickets.sort((a: any, b: any) => {
        const seatNumberA = +a?.seatAssignment?.slice(1);
        const seatNumberB = +b?.seatAssignment?.slice(1);        
        return seatNumberA - seatNumberB;
      });

      // Calcular filas y columnas para organizar los asientos
      const maxSeatNumber = +this.tickets[this.tickets.length - 1].seatAssignment.slice(1);
      const rows = Math.ceil(maxSeatNumber / 10); // Supongamos que hay 10 asientos por fila

      // Generar las filas y columnas de asientos
      for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < this.tickets.length; j++) {
          const seatNumber = i * 10 + j + 1;
          const ticket = this.tickets.find(
            (t) => +t.seatAssignment.slice(1) === seatNumber
          );
          row.push({
            ...ticket,
            seatAssignment: 'A' + seatNumber,
            isSelected: false,
            available: !!ticket, // El asiento está disponible si se encuentra en la lista de tickets
          });
        }
        this.ticketRows.push(row);
      }
    } else if (this.tickets.length > 0 && !this.tickets.some((ticket: any) => ticket.hasSeatAssignment)) {
      console.log(this.tickets)
      this.maxTickets = this.tickets.length
      
    } else {
      console.log('El evento no tiene asientos asignados o no hay tickets disponibles.');

    }
  }
}
