import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IFlight } from 'src/app/services/flight.model';

@Injectable({
  providedIn: 'root',
})
export class FlightInfoService {

  private flight: IFlight;

  private flightInfo$: BehaviorSubject<IFlight | undefined> = new BehaviorSubject<IFlight | undefined>(undefined);

  public getFlightInfo$(): Observable<IFlight | undefined> {
    return this.flightInfo$.asObservable();
  }

  public setFlightInfo(value: IFlight): void {
    this.flight = value;
    this.flightInfo$.next(this.flight);
  }

}
