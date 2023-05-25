import {
  Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { PassengersState, SelectedFlight } from 'src/app/redux/state.model';
import { Flight, Price } from 'src/app/services/flight.model';
import { TicketInfoComponent } from '../../../shared/components/ticket-info/ticket-info.component';
import { SummaryComponent } from '../../../shared/components/summary/summary.component';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import { StepperService } from '../../../core/services/stepper-service.service';
import { IPassengerInfo } from '../../models/passengerInfo.model';
import * as FlightActions from '../../../redux/actions/flight.actions';
import * as PassengerSelect from '../../../redux/actions/passengers.action';
import * as CartActions from '../../../redux/actions/cart.actions';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit, OnDestroy {

  public flight$: Observable<SelectedFlight>;

  private passengers$: Observable<PassengersState>;

  private subscription: Subscription;

  private directFlight: Flight;

  private reverseFlight: Flight;

  public passengers: IPassengerInfo;

  private summaryInstance: SummaryComponent;

  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;

  @ViewChild('summary', { read: ViewContainerRef, static: true }) summary: ViewContainerRef;

  constructor(
    private store: Store,
    private stepperSwitcher: StepperService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.stepperSwitcher.switchStepper('third');
    this.flight$ = this.store.select(FlightSelect.selectSelectedFlight);
    this.initFlight();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initFlight(): void {
    this.subscription = this.flight$.subscribe((flight) => {
      const directView: ComponentRef<TicketInfoComponent> = this.container.createComponent(
        TicketInfoComponent,
      );
      this.directFlight = flight.direct;
      directView.instance.flight = this.directFlight;
      // directView.instance.passengers = flight.passengers;

      const reverseView: ComponentRef<TicketInfoComponent> = this.container.createComponent(
        TicketInfoComponent,
      );
      this.reverseFlight = flight.reverse;
      reverseView.instance.flight = this.reverseFlight;
      // reverseView.instance.passengers = flight.passengers;

      const flightCost = this.summary.createComponent(SummaryComponent);
      // flightCost.instance.passengers = flight.passengers;
      const directCost = flight.direct?.price;
      const reverseCost = flight.reverse?.price;
      flightCost.instance.cost = this.getFlightCost(directCost, reverseCost);
      this.summaryInstance = flightCost.instance;
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

  private addFlightToCart(): void {
    this.store
      .dispatch(CartActions.addFlights(
        {
          flights:
            {
              forward: this.directFlight,
              reverse: this.reverseFlight,
            },
        },
      ));
  }

  public addToCart(): void {
    this.addFlightToCart();
    this.store.dispatch(FlightActions.clearStore());
    this.router.navigateByUrl('/');
  }

  public buy(): void {
    this.store
      .dispatch(FlightActions.updateTotalCost({ totalCost: this.summaryInstance.totalCost }));
    this.router.navigateByUrl('/cart');
  }

  public back(): void {
    this.router.navigateByUrl('/');
  }

}
