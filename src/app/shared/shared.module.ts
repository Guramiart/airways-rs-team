import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketInfoComponent } from './components/ticket-info/ticket-info.component';
import { PassengerInfoComponent } from './components/passenger-info/passenger-info.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TableRecordComponent } from './components/table-record/table-record.component';
import { MaterialModule } from '../material/material.module';
import { SeatsDirective } from './directives/seats.directive';

@NgModule({
  declarations: [
    TicketInfoComponent,
    PassengerInfoComponent,
    SummaryComponent,
    TableRecordComponent,
    SeatsDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    TicketInfoComponent,
    PassengerInfoComponent,
    SeatsDirective,
  ],
})
export class SharedModule { }
