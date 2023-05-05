import { TestBed } from '@angular/core/testing';

import { CartSwitcherService } from './cart-switcher.service';

describe('CartSwitcherService', () => {
  let service: CartSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
