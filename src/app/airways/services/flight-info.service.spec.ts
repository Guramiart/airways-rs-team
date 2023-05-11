import { TestBed } from '@angular/core/testing';

import { FlightInfoService } from './flight-info.service';

describe('FlightInfoService', () => {
  let service: FlightInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
