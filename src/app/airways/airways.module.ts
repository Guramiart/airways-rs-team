import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { MaterialModule } from '../material/material.module';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { SecondStepComponent } from './components/second-step/second-step.component';
import { BookingEditComponent } from './components/booking-edit/booking-edit.component';
import { BookingEditorComponent } from './components/booking-editor/booking-editor.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { LogInComponent } from './components/modal-window/log-in/log-in.component';
import { SignInComponent } from './components/modal-window/sign-in/sign-in.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SummaryPageComponent } from './components/summary-page/summary-page.component';
import { FlightInfoComponent } from './components/flight-info/flight-info.component';
import { PassengerFormComponent } from './components/second-step/passenger-form/passenger-form.component';
import { ContactsFormComponent } from './components/second-step/contacts-form/contacts-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainPageComponent,
    BookingPageComponent,
    ShoppingCartPageComponent,
    FlightSearchComponent,
    FirstStepComponent,
    SecondStepComponent,
    BookingEditComponent,
    BookingEditorComponent,
    ModalWindowComponent,
    LogInComponent,
    SignInComponent,
    CalendarComponent,
    SummaryPageComponent,
    FlightInfoComponent,
    PassengerFormComponent,
    ContactsFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterOutlet,
    NgOptimizedImage,
    SlickCarouselModule,
    MatTableModule,
    MatMenuModule,
    SharedModule,
    MatSnackBarModule,
  ],
  exports: [
    MainPageComponent,
    BookingPageComponent,
    ShoppingCartPageComponent,
    ModalWindowComponent,
  ],
})
export class AirwaysModule { }
