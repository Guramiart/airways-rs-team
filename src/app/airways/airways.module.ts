import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { MaterialModule } from '../material/material.module';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { LogInComponent } from './components/modal-window/log-in/log-in.component';
import { SignInComponent } from './components/modal-window/sign-in/sign-in.component';

@NgModule({
  declarations: [
    MainPageComponent,
    BookingPageComponent,
    ShoppingCartPageComponent,
    FlightSearchComponent,
    ModalWindowComponent,
    LogInComponent,
    SignInComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MainPageComponent,
    BookingPageComponent,
    ShoppingCartPageComponent,
    ModalWindowComponent,
  ],
})
export class AirwaysModule { }
