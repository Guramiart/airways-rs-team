import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MainPageComponent,
    BookingPageComponent,
    ShoppingCartPageComponent,
    FlightSearchComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MainPageComponent,
    BookingPageComponent,
    ShoppingCartPageComponent,
  ],
})
export class AirwaysModule { }
