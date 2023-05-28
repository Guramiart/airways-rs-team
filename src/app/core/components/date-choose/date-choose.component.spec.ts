import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateChooseComponent } from './date-choose.component';

describe('DateChooseComponent', () => {
  let component: DateChooseComponent;
  let fixture: ComponentFixture<DateChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateChooseComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DateChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
