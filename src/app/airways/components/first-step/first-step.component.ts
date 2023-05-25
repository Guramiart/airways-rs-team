import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FlightTypes } from 'src/app/shared/enums/flight-types';
import { IFlightState } from 'src/app/redux/state.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import { StepperService } from '../../../core/services/stepper-service.service';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
})
export class FirstStepComponent implements OnInit, OnDestroy {

  public flights$: Observable<IFlightState>;

  private isRound: boolean = true;

  private subscription: Subscription;

  constructor(
    private store: Store,
    private router: Router,
    private stepperSwitcher: StepperService,
  ) {}

  ngOnInit(): void {
    this.stepperSwitcher.switchStepper('first');
    this.flights$ = this.store.select(FlightSelect.selectFlight);
    this.subscription = this.flights$.subscribe((data) => {
      if (data.flightType === FlightTypes.ONE_WAY) {
        this.isRound = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public isRoundTrip(): boolean {
    return this.isRound;
  }

  public back(isBack:boolean):void {
    if (isBack) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('step/2');
    }
  }

}
