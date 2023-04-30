import {
  AfterViewInit, Component, ViewChild, ViewContainerRef,
} from '@angular/core';

import { PassengerInfoComponent } from '../passenger-info/passenger-info.component';

// TODO: Remove or move to a separate file after
export interface Ticket {
  flight: string,
  direction: string,
  date: string,
  time: string,
  prices: {
    adult: Passenger[],
    child: Passenger[],
    infant: Passenger[],
  }
}

export interface Passenger {
  name: string,
  fare: number,
  tax: number,
  place: string | null,
}

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss'],
})
export class TicketInfoComponent implements AfterViewInit {

  public flightNumber = '0';

  public flightDirection = '';

  public date = '';

  public time = '';

  public ticket: Ticket;

  @ViewChild('passengersContainer', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  ngAfterViewInit(): void {
    this.addData();
    this.addPassengerData();
  }

  private addData():void {
    this.flightNumber = this.ticket.flight;
    this.flightDirection = this.ticket.direction;
    this.date = this.ticket.date;
    this.time = this.ticket.time;
  }

  private addPassengerData(): void {

    if (this.ticket.prices.adult.length) {
      this.ticket.prices.adult.forEach((data: Passenger) => {
        const passenger = this.container.createComponent(PassengerInfoComponent);
        passenger.instance.passengerData = data;
      });
    }

    if (this.ticket.prices.child.length) {
      this.ticket.prices.child.forEach((data: Passenger) => {
        const passenger = this.container.createComponent(PassengerInfoComponent);
        passenger.instance.passengerData = data;
      });
    }

    if (this.ticket.prices.infant.length) {
      this.ticket.prices.infant.forEach((data: Passenger) => {
        const passenger = this.container.createComponent(PassengerInfoComponent);
        passenger.instance.passengerData = data;
      });
    }
  }

}
