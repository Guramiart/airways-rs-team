import { Injectable } from '@angular/core';
import {
  CanActivate, Router, UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IFlightState } from 'src/app/redux/state.model';
import * as FlightSelect from '../redux/selectors/flight.selector';

@Injectable({
  providedIn: 'root',
})
export class StoreGuardService implements CanActivate {

  public flights: IFlightState;

  constructor(private router: Router, private store: Store) { }

  canActivate():
  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // eslint-disable-no-store-subscription
    this.store.select(FlightSelect.selectFlight)
      .subscribe((data) => {
        this.flights = data;
      });

    if (!this.flights.from) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
