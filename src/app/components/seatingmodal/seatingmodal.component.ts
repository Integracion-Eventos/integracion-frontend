import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-seating-modal',
  templateUrl: './seatingmodal.component.html',
  styleUrls: ['./seatingmodal.component.scss'],
})
export class SeatingModalComponent {
  @Input() seatingData: any;
  selectedSeats: any[] = [];

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  toggleSeatSelection(seat: any) {
    seat.selected = !seat.selected;
  }

  assignSeats(category: string) {
    const selectedSeats = this.seatingData.seatsData.filter((seat: any) => seat.selected);
    selectedSeats.forEach((seat: any) => {
      seat.category = category;
      seat.selected = false; // Cambiar el color de vuelta
    });
    this.modalController.dismiss(selectedSeats);
  }

  resetSeats() {
    this.seatingData.seatsData.forEach((seat: any) => {
      seat.selected = false;
    });
  }
}
