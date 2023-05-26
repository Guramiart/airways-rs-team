import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFlightState } from 'src/app/redux/state.model';
import {
  Airport, Flight, Flights,
} from 'src/app/services/flight.model';
import { ICalendar } from 'src/app/services/calendar.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import * as SelectFlightAction from '../../../redux/actions/selected-flight.action';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  public flight$: Observable<IFlightState>;

  public dates: ICalendar[] = [];

  public flights: Flights;

  public from: Airport;

  public destination: Airport;

  public curFlights: Flights;

  public startDate: string;

  @Input() isForward: boolean;

  public flightData: Flight;

  public isSelected: boolean = false;

  constructor(
    private readonly store: Store,
  ) {}

  isCurrentDate(item: ICalendar): boolean {
    if (new Date(item.date).getDate() === new Date(this.startDate).getDate()) {
      this.flightData = item.flight;
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.flight$ = this.store.select(FlightSelect.selectFlight);
    this.flight$
      .subscribe((data) => {
        if (this.isForward) {
          this.flightData = data.from;
          this.from = this.flightData?.form;
          this.destination = this.flightData?.to;
          this.startDate = data.startDate;
          this.flights = this.flightData?.otherFlights;
        } else {
          this.flightData = data.destination;
          this.from = this.flightData?.form;
          this.destination = this.flightData?.to;
          this.startDate = data.endDate;
          this.flights = this.flightData?.otherFlights;
        }
        this.dates = this.initDateArray(data, this.startDate);
      });
  }

  slideClick(info: ICalendar) {
    this.startDate = new Date(info.date).toISOString();
    this.flightData = info.flight;
  }

  private initDateArray(flightData: IFlightState, startDate: string): ICalendar[] {
    const dates = [];
    if (startDate !== null) {
      const start = new Date(startDate);
      let curDate = new Date(start);
      if (this.flights !== undefined) {
        for (let i = -5; i <= 5; i += 1) {
          curDate = new Date(curDate.setDate(start.getDate() + i));
          let flight;
          if (i !== 0) {
            flight = { date: curDate.toISOString(), flight: this.flights[i] };
          } else {
            const curFlight = this.isForward ? flightData.from : flightData.destination;
            flight = { date: curDate.toISOString(), flight: curFlight };
          }
          dates.push(flight);
        }
      }
    }
    return dates;
  }

  editFlight() {
    this.isSelected = !this.isSelected;
  }

  selectFlight(flight: Flight) {
    if (flight !== undefined) {
      if (this.isForward) {
        this.store.dispatch(SelectFlightAction.updateDirect({ flight }));
      } else {
        this.store.dispatch(SelectFlightAction.updateReverse({ flight }));
      }
    } else if (this.isForward) {
      this.store.dispatch(SelectFlightAction.updateDirect({ flight: null }));
    } else {
      this.store.dispatch(SelectFlightAction.updateReverse({ flight: null }));
    }
    this.isSelected = !this.isSelected;
  }

}
