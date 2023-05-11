import { TestBed } from '@angular/core/testing';

import { SortingService } from './sorting-service.service';

describe('SortingServiceService', () => {
  let service: SortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
