import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFlightState } from 'src/app/redux/state.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import { Passengers } from '../../models/passengers';

@Component({
  selector: 'app-booking-editor',
  templateUrl: './booking-editor.component.html',
  styleUrls: ['./booking-editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BookingEditorComponent implements OnInit {

  public flights$: Observable<IFlightState> | undefined;

  public passengers: Passengers | null = null;

  public adult: number | undefined;

  public child: number | undefined;

  public infant: number | undefined;

  public passengerList: string | undefined;

  public formDate!: FormGroup;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.flights$ = this.store.select(FlightSelect.selectFlight);
    this.flights$.subscribe((flight) => {
      this.formDate = new FormGroup({
        start: new FormControl<string>(flight.startDate),
        end: new FormControl<string>(flight.endDate),
      });
      this.passengers = flight.passengers;
      this.adult = flight.passengers?.passengers.adult.count;
      this.child = flight.passengers?.passengers.child.count;
      this.infant = flight.passengers?.passengers.infant.count;
    });
    this.generatePassengerList();
  }

  public adultCounter(marker: boolean): void {
    if (marker && this.adult !== undefined) {
      this.adult += 1;
    } else {
      this.adult = this.adult ? this.adult - 1 : this.adult;
    }

    this.generatePassengerList();
  }

  public childCounter(marker: boolean): void {
    if (marker && this.child !== undefined) {
      this.child += 1;
    } else {
      this.child = this.child ? this.child - 1 : this.child;
    }

    this.generatePassengerList();
  }

  public infantsCounter(marker: boolean): void {
    if (marker && this.infant !== undefined) {
      this.infant += 1;
    } else {
      this.infant = this.infant ? this.infant - 1 : this.infant;
    }

    this.generatePassengerList();
  }

  private generatePassengerList(): void {
    this.passengerList = '';
    if (this.adult) {
      this.passengerList = `${this.adult} Adult`;
    }

    if (this.child) {
      if (this.adult) {
        this.passengerList = `${this.passengerList} ,${this.child} Child`;
      } else {
        this.passengerList = `${this.child} Child`;
      }
    }

    if (this.infant) {
      if (this.passengerList.length) {
        this.passengerList = `${this.passengerList} ,${this.infant} Infants`;
      } else {
        this.passengerList = `${this.infant} Infants`;
      }
    }
  }

}
