import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingEditorComponent } from './booking-editor.component';

describe('BookingEditorComponent', () => {
  let component: BookingEditorComponent;
  let fixture: ComponentFixture<BookingEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingEditorComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
