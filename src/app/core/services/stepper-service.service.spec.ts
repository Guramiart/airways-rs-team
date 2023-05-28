import { TestBed } from '@angular/core/testing';

import { StepperServiceService } from './stepper-service.service';

describe('StepperServiceService', () => {
  let service: StepperServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepperServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
