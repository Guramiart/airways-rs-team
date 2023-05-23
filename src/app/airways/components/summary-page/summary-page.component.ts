import {
  AfterViewInit,
  Component, ComponentRef, OnInit, ViewChild, ViewContainerRef,
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFlightState } from 'src/app/redux/state.model';
import { Price } from 'src/app/services/flight.model';
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

      const flightCost = this.summary.createComponent(SummaryComponent);
      flightCost.instance.passengers = flight.passengers;
      const directCost = flight.selectedDirectFlight?.price;
      const reverseCost = flight.selectedReverseFlight?.price;
      flightCost.instance.cost = this.getFlightCost(directCost, reverseCost);
    });

  }

  private getFlightCost(...cost: Array<Price>): Price {
    return cost.reduce((result: Price, current: Price) => {
      Object.keys(current).forEach((key) => {
        result[key] += current[key];
      });
      return result;
    }, {
      eur: 0, usd: 0, rub: 0, pln: 0,
    });

  }

}
