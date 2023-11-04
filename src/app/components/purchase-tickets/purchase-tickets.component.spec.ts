import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PurchaseTicketsComponent } from './purchase-tickets.component';

describe('PurchaseTicketsComponent', () => {
  let component: PurchaseTicketsComponent;
  let fixture: ComponentFixture<PurchaseTicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseTicketsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PurchaseTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
