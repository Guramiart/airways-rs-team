import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketInfoComponent } from './components/ticket-info/ticket-info.component';
import { PassengerInfoComponent } from './components/passenger-info/passenger-info.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [TicketInfoComponent, PassengerInfoComponent, SummaryComponent],
  imports: [
    CommonModule,
  ],
  exports: [TicketInfoComponent, PassengerInfoComponent],
})
export class SharedModule { }
