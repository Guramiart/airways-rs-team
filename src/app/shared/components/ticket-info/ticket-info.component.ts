import {
  Component, OnInit, ViewChild, ViewContainerRef,
} from '@angular/core';
import { Flight } from 'src/app/services/flight.model';
import { IPassengerInfo } from 'src/app/airways/models/passengerInfo.model';
import { Passengers } from 'src/app/airways/models/passengers';
import { PassengerInfoComponent } from '../passenger-info/passenger-info.component';

@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.scss'],
})
export class TicketInfoComponent implements OnInit {

  public flight: Flight;

  public passengers: Passengers;

  @ViewChild('passengersContainer', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  ngOnInit(): void {
    this.addPassengerData();
  }

  private addPassengerData(): void {
    if (this.passengers) {
      this.passengers.passengers.adult.info?.forEach((passanger: IPassengerInfo) => {
        const passenger = this.container.createComponent(PassengerInfoComponent);
        passenger.instance.passengerData = passanger;
      });
      this.passengers.passengers.child.info?.forEach((passanger: IPassengerInfo) => {
        const passenger = this.container.createComponent(PassengerInfoComponent);
        passenger.instance.passengerData = passanger;
      });
      this.passengers.passengers.infant.info?.forEach((passanger: IPassengerInfo) => {
        const passenger = this.container.createComponent(PassengerInfoComponent);
        passenger.instance.passengerData = passanger;
      });
    }
  }

}
