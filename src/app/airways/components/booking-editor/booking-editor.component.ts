import {
  Component, OnDestroy, OnInit, ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IFlightState } from 'src/app/redux/state.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import * as PassengerSelect from '../../../redux/selectors/passenger.selector';
import { Passengers } from '../../models/passengers';

@Component({
  selector: 'app-booking-editor',
  templateUrl: './booking-editor.component.html',
  styleUrls: ['./booking-editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class BookingEditorComponent implements OnInit, OnDestroy {

  public flights$: Observable<IFlightState>;

  public passengers$: Observable<Passengers>;

  private flightSubscription: Subscription;

  private passengerSubscription: Subscription;

  public passengers: Passengers;

  public adult: number;

  public child: number;

  public infant: number;

  public passengerList: string;

  public formDate!: FormGroup;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.flights$ = this.store.select(FlightSelect.selectFlight);
    this.passengers$ = this.store.select(PassengerSelect.selectPassengers);
    this.flightSubscription = this.flights$.subscribe((flight) => {
      this.formDate = new FormGroup({
        start: new FormControl<string>(flight.startDate),
        end: new FormControl<string>(flight.endDate),
      });
    });
    this.passengerSubscription = this.passengers$.subscribe((passenger) => {
      this.passengers = passenger;
      this.adult = passenger.passengers.adult.count;
      this.child = passenger.passengers.child.count;
      this.infant = passenger.passengers.infant.count;
    });

    this.generatePassengerList();
  }

  ngOnDestroy(): void {
    this.flightSubscription.unsubscribe();
    this.passengerSubscription.unsubscribe();
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
