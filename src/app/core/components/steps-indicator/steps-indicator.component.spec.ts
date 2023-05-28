import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsIndicatorComponent } from './steps-indicator.component';

describe('StepsIndicatorComponent', () => {
  let component: StepsIndicatorComponent;
  let fixture: ComponentFixture<StepsIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepsIndicatorComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(StepsIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
