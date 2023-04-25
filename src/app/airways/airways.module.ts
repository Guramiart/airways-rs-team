import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { MaterialModule } from '../material/material.module';
import { FirstStepComponent } from './components/first-step/first-step.component';
import { SecondStepComponent } from './components/second-step/second-step.component';
import { BookingEditComponent } from './components/booking-edit/booking-edit.component';
import { BookingEditorComponent } from './components/booking-editor/booking-editor.component';

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
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterOutlet,
  ],
  exports: [
    MainPageComponent,
    BookingPageComponent,
    ShoppingCartPageComponent,
  ],
})
export class AirwaysModule { }
