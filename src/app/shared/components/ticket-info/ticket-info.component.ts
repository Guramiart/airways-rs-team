import {
  AfterViewInit, Component, ViewChild, ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IFlightState } from 'src/app/redux/state.model';
import { Flight } from 'src/app/services/flight.model';
import { IPassengerInfo } from 'src/app/airways/models/passengerInfo.model';
import { Ticket } from '../../enums/tickets-data';
import { PassengerInfoComponent } from '../passenger-info/passenger-info.component';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss'],
})
export class TicketInfoComponent implements AfterViewInit {

  public ticket: Ticket;

  public flight: IFlightState | null;

  @ViewChild('passengersContainer', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  ngAfterViewInit(): void {
    this.addPassengerData();
  }

  /*
  private addData():void {
    this.flightNumber = this.ticket.flight;
    this.flightDirection = this.ticket.direction;
    this.date = this.ticket.date;
    this.time = this.ticket.time;
  }
  */

  private addPassengerData(): void {
    if (this.flight) {
      this.flight.passengers?.passengers.adult.info?.forEach((passanger: IPassengerInfo) => {
        const passenger = this.container.createComponent(PassengerInfoComponent);
        passenger.instance.passengerData = passanger;
      });
      this.flight.passengers?.passengers.child.info?.forEach((passanger: IPassengerInfo) => {
        const passenger = this.container.createComponent(PassengerInfoComponent);
        passenger.instance.passengerData = passanger;
      });
      this.flight.passengers?.passengers.infant.info?.forEach((passanger: IPassengerInfo) => {
        const passenger = this.container.createComponent(PassengerInfoComponent);
        passenger.instance.passengerData = passanger;
      });
    }
    /*
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
    */
  }

}
