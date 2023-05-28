import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IFlightState } from 'src/app/redux/state.model';
import * as FlightSelect from '../redux/selectors/flight.selector';

@Injectable({
  providedIn: 'root',
})
export class StoreGuardService implements CanActivate {

  public flights: IFlightState;

  private flights$: Observable<IFlightState>;

  private subsription: Subscription;

  constructor(private router: Router, private store: Store) { }

  canActivate():
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.flights$ = this.store.select(FlightSelect.selectFlight);
    this.subsription = this.flights$.subscribe((data) => {
      this.flights = data;
    });

    if (!this.flights.from) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
