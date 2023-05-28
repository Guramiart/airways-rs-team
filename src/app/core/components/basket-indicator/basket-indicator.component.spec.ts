import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketIndicatorComponent } from './basket-indicator.component';

describe('BasketIndicatorComponent', () => {
  let component: BasketIndicatorComponent;
  let fixture: ComponentFixture<BasketIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasketIndicatorComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BasketIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
