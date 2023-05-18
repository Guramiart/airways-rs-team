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

  public getUser(id:number | string | null): Observable<IUser> {
    return this.http.get<IUser>(`users/${id}`);
  }

  public getUserByName(email:string): Observable<IUser[]> {
    return this.http.get<IUser[]>(`users?email=${email}`);
  }

  public setNewUser(newUser:IUser) {
    this.http.post<IUser[]>('users', newUser).subscribe();
  }

  public changeLS(id:number, isSignOut?:boolean):void {
    if (isSignOut) {
      localStorage.removeItem('authUserAirways');
    } else {
      localStorage.setItem('authUserAirways', id.toString());
    }
  }

  public setAuthUserFromLS():void {
    if (localStorage.getItem('authUserAirways') !== null) {
      this.getUser(localStorage.getItem('authUserAirways'))
        .subscribe((data) => this.store.dispatch(SettingsAction.setAuthUser({ authUser: data })));
    }
  }

}
