import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyChooseComponent } from './currency-choose.component';

describe('CurrencyChooseComponent', () => {
  let component: CurrencyChooseComponent;
  let fixture: ComponentFixture<CurrencyChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrencyChooseComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CurrencyChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
