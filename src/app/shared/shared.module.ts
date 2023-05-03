import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketInfoComponent } from './components/ticket-info/ticket-info.component';
import { PassengerInfoComponent } from './components/passenger-info/passenger-info.component';
import { SummaryComponent } from './components/summary/summary.component';
import { TableRecordComponent } from './components/table-record/table-record.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    TicketInfoComponent,
    PassengerInfoComponent,
    SummaryComponent,
    TableRecordComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [TicketInfoComponent, PassengerInfoComponent],
})
export class SharedModule { }
