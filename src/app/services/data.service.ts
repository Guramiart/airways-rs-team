import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUser } from './user.model';

import * as SettingsAction from '../redux/actions/settings.actions';
import { Airport, Flight, FlightRequest } from './flight.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(
    private http: HttpClient,
    private store:Store,
  ) { }

  public getAllCities(): Observable<Airport[]> {
    return this.http.get<Airport[]>('search/airport');
  }

  public searchFlights(flight: FlightRequest): Observable<Flight[]> {
    return this.http.post<Flight[]>('search/flight', flight);
  }

  public loginUser(resp:{ email:string, password:string }) {
    return this.http.post<{ token:string }>('auth/login', resp);
  }

  public getUserToken(token:string | null) {
    return this.http.get<IUser>('auth/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public setNewUser(newUser:IUser) {
    return this.http.post<{ token:string }>('auth/registration', newUser);
  }

  public changeLS(token:string, isSignOut?:boolean):void {
    if (isSignOut) {
      localStorage.removeItem('authUserAirways');
    } else {
      localStorage.setItem('authUserAirways', token);
    }
  }

  public setAuthUserFromLS():void {
    if (localStorage.getItem('authUserAirways') !== null) {
      this.getUserToken(localStorage.getItem('authUserAirways'))
        .subscribe((data) => this.store.dispatch(SettingsAction.setAuthUser({ authUser: data })));
    }
  }

}
