import { TestBed } from '@angular/core/testing';

import { EventcategoriesService } from './eventcategories.service';

describe('EventcategoriesService', () => {
  let service: EventcategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventcategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
