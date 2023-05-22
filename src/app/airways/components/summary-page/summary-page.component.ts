import {
  AfterViewInit,
  Component, ComponentRef, OnInit, ViewChild, ViewContainerRef,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFlightState } from 'src/app/redux/state.model';
import { TicketInfoComponent } from '../../../shared/components/ticket-info/ticket-info.component';
import { SummaryComponent } from '../../../shared/components/summary/summary.component';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import { StepperService } from '../../../core/services/stepper-service.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements AfterViewInit, OnInit {

  private flight$: Observable<IFlightState>;

  // TODO: replace the mok data after!!!
  /*
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
  */

  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  @ViewChild('summary', { read: ViewContainerRef, static: true }) summary: ViewContainerRef;

  constructor(private store: Store, private stepperSwitcher: StepperService) {
  }

  ngOnInit(): void {
    this.stepperSwitcher.switchStepper('third');
    this.flight$ = this.store.select(FlightSelect.selectFlight);
  }

  ngAfterViewInit(): void {
    this.flight$.subscribe((flight) => {
      const directView: ComponentRef<TicketInfoComponent> = this.container.createComponent(
        TicketInfoComponent,
      );
      directView.instance.flight = flight.selectedDirectFlight;
      directView.instance.passengers = flight.passengers;
      const reverseView: ComponentRef<TicketInfoComponent> = this.container.createComponent(
        TicketInfoComponent,
      );
      reverseView.instance.flight = flight.selectedReverseFlight;
      reverseView.instance.passengers = flight.passengers;

      const passengerInfo = this.summary.createComponent(SummaryComponent);
      passengerInfo.instance.passengers = flight.passengers;
    });

  }

}
