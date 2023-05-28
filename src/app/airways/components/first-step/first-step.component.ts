import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FlightTypes } from 'src/app/shared/enums/flight-types';
import { IFlightState, SelectedFlight } from 'src/app/redux/state.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import * as SelectedSelect from '../../../redux/selectors/selected-flight.selector';
import * as SelectedActions from '../../../redux/actions/selected-flight.action';
import { StepperService } from '../../../core/services/stepper-service.service';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
})
export class FirstStepComponent implements OnInit, OnDestroy {

  public flights$: Observable<IFlightState>;

  public selected$: Observable<SelectedFlight>;

  public selected: SelectedFlight;

  private isRound: boolean = true;

  private subscription: Subscription;

  private selectSubscription: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private stepperSwitcher: StepperService,
  ) {}

  ngOnInit(): void {
    this.stepperSwitcher.switchStepper('first');
    this.flights$ = this.store.select(FlightSelect.selectFlight);
    this.selected$ = this.store.select(SelectedSelect.selectFlights);
    this.subscription = this.flights$.subscribe((data) => {
      if (data.flightType === FlightTypes.ONE_WAY) {
        this.isRound = false;
      }
    });
    this.selectSubscription = this.selected$.subscribe((data) => {
      this.selected = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.selectSubscription.unsubscribe();
  }

  public isRoundTrip(): boolean {
    return this.isRound;
  }

  public isSelected(): boolean {
    return this.isRoundTrip()
      ? Boolean(this.selected.direct && this.selected.reverse)
      : Boolean(this.selected.direct);
  }

  public back(isBack:boolean):void {
    if (isBack) {
      this.router.navigateByUrl('/');
      this.store.dispatch(SelectedActions.clearStore());
    } else {
      this.router.navigateByUrl('step/2');
    }
  }

}
