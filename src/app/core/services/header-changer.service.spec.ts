import { TestBed } from '@angular/core/testing';

import { HeaderChangerService } from './header-changer.service';

describe('HeaderChangerService', () => {
  let service: HeaderChangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderChangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
