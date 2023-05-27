import {
  Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SelectedFlight } from 'src/app/redux/state.model';
import { Flight, Price } from 'src/app/services/flight.model';
import { TicketInfoComponent } from '../../../shared/components/ticket-info/ticket-info.component';
import { SummaryComponent } from '../../../shared/components/summary/summary.component';
import { StepperService } from '../../../core/services/stepper-service.service';
import { Passengers } from '../../models/passengers';
import * as FlightSelect from '../../../redux/selectors/selected-flight.selector';
import * as SelectedActions from '../../../redux/actions/selected-flight.action';
import * as PassengerAction from '../../../redux/actions/passengers.action';
import * as FlightActions from '../../../redux/actions/flight.actions';
import * as PassengerSelect from '../../../redux/selectors/passenger.selector';
import * as CartActions from '../../../redux/actions/cart.actions';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
})
export class SummaryPageComponent implements OnInit, OnDestroy {

  public flights$: Observable<SelectedFlight>;

  private passengers$: Observable<Passengers>;

  private subscription: Subscription;

  private passengerSubscription: Subscription;

  private directFlight: Flight;

  private reverseFlight: Flight;

  public passengers: Passengers;

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
    this.flights$ = this.store.select(FlightSelect.selectFlights);
    this.passengers$ = this.store.select(PassengerSelect.selectPassengers);
    this.passengerSubscription = this.passengers$
      .subscribe((data) => {
        this.passengers = data;
      });
    this.initFlight();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.passengerSubscription.unsubscribe();
  }

  private initFlight(): void {
    this.subscription = this.flights$.subscribe((flight) => {
      const directView: ComponentRef<TicketInfoComponent> = this.container.createComponent(
        TicketInfoComponent,
      );
      this.directFlight = flight.direct;
      directView.instance.flight = this.directFlight;
      directView.instance.passengers = this.passengers;

      this.reverseFlight = flight.reverse;
      if (this.reverseFlight) {
        const reverseView: ComponentRef<TicketInfoComponent> = this.container.createComponent(
          TicketInfoComponent,
        );
        reverseView.instance.flight = this.reverseFlight;
        reverseView.instance.passengers = this.passengers;
      }

      const flightCost = this.summary.createComponent(SummaryComponent);
      flightCost.instance.passengers = this.passengers;
      const directCost = flight.direct.price;
      flightCost.instance.cost = (flight.reverse !== null)
        ? this.getFlightCost(directCost, flight.reverse.price)
        : this.getFlightCost(directCost);
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
          flights: {
            flight: {
              forward: this.directFlight,
              reverse: this.reverseFlight,
            },
            totalCost: this.summaryInstance.totalCost,
            passengers: this.passengers,
          },
        },
      ));
  }

  private clearSelected() {
    this.store.dispatch(SelectedActions.clearStore());
  }

  private clearPassengers() {
    this.store.dispatch(PassengerAction.clearStore());
  }

  private clearFlights() {
    this.store.dispatch(FlightActions.clearStore());
  }

  public addToCart(): void {
    this.addFlightToCart();
    setTimeout(() => {
      this.clearPassengers();
      this.clearSelected();
      this.clearFlights();
    }, 300);
    this.router.navigateByUrl('/');
  }

  public buy(): void {
    this.addFlightToCart();
    this.router.navigateByUrl('/cart');
  }

  public back(): void {
    this.router.navigateByUrl('step/2');
  }

}
