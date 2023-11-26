import { TestBed } from '@angular/core/testing';

import { EventassistanceService } from './eventassistance.service';

describe('EventassistanceService', () => {
  let service: EventassistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventassistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
