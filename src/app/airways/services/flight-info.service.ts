import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from 'src/app/services/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightInfoService {

  private flight: Flight;

  // eslint-disable-next-line max-len
  private flightInfo$: BehaviorSubject<Flight | undefined> = new BehaviorSubject<Flight | undefined>(undefined);

  public getFlightInfo$(): Observable<Flight | undefined> {
    return this.flightInfo$.asObservable();
  }

  public setFlightInfo(value: Flight): void {
    this.flight = value;
    this.flightInfo$.next(this.flight);
  }

}
