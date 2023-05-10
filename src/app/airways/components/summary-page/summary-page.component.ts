import {
  AfterViewInit,
  Component, ComponentRef, OnInit, ViewChild, ViewContainerRef,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { TicketInfoComponent } from '../../../shared/components/ticket-info/ticket-info.component';
import { SummaryComponent } from '../../../shared/components/summary/summary.component';
import * as FlightSelect from '../../../redux/selectors/flight.selector';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements AfterViewInit, OnInit {

  constructor(private store: Store) {}

  // TODO: replace the mok data after!!!
  private mokPassengerData = {
    tickets: [
      {
        flight: 'FR1925',
        direction: 'Dublin — Warsaw Modlin',
        date: 'Wednesday, 1 March, 2023',
        time: '8:40 — 12:00',
        prices: {
          adult: [{
            name: 'Harry Potter',
            fare: 83,
            tax: 45.655,
            place: 'Seat 19E',
          }],
          child: [{
            name: 'Lolli Potter',
            fare: 53,
            tax: 45.04,
            place: 'Seat 20E',
          }],
          infant: [{
            name: 'James Potter',
            fare: 44,
            tax: 5,
            place: null,
          }],
        },
      },
      {
        flight: 'FR1925',
        direction: 'Warsaw Modlin — Dublin',
        date: 'Saturday, 18 March, 2023',
        time: '7:40 — 11:00',
        prices: {
          adult: [{
            name: 'Harry Potter',
            fare: 83,
            tax: 45.655,
            place: 'Seat 19E',
          }],
          child: [{
            name: 'Lolli Potter',
            fare: 53,
            tax: 45.04,
            place: 'Seat 20E',
          }],
          infant: [{
            name: 'James Potter',
            fare: 44,
            tax: 5,
            place: null,
          }],
        },
      },
    ],
  };

  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  @ViewChild('summary', { read: ViewContainerRef, static: true }) summary: ViewContainerRef;

  ngOnInit(): void {
    this.store.select(FlightSelect.selectFlight)
      .subscribe((data) => console.log(data));
  }

  ngAfterViewInit(): void {
    this.mokPassengerData.tickets.forEach((ticket, index) => {
      const ticketView: ComponentRef<TicketInfoComponent> = this.container.createComponent(
        TicketInfoComponent,
        { index },
      );

      ticketView.instance.ticket = ticket;
    });

    const totalInfo = this.summary.createComponent(SummaryComponent);
    totalInfo.instance.tickets = this.mokPassengerData.tickets;
  }

}
