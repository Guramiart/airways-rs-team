import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICity } from './cities.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getAllCities(): Observable<ICity[]> {
    return this.http.get<ICity[]>('cities');
  }

  public getUser(id:number): Observable<ICity[]> {
    return this.http.get<ICity[]>(`users/${id}`);
  }

}
