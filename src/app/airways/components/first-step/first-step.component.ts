import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FlightState } from 'src/app/redux/state.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import { StepperService } from '../../../core/services/stepper-service.service';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
})
export class FirstStepComponent implements OnInit {

  public flights$: Observable<FlightState> | undefined;

  constructor(
    private store: Store,
    private router: Router,
    private stepperSwitcher: StepperService,
  ) {}

  ngOnInit(): void {
    this.stepperSwitcher.switchStepper('first');
    this.flights$ = this.store.select(FlightSelect.selectFlight);
  }

  public back(isBack:boolean):void {
    if (isBack) {
      this.router.navigateByUrl('/');
    } else {
      this.router.navigateByUrl('step/2');
    }
  }

}
