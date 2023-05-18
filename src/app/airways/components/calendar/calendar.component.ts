import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFlightState } from 'src/app/redux/state.model';
import {
  Airport, Flight, Flights, IFlight,
} from 'src/app/services/flight.model';
import { Calendar, ICalendar } from 'src/app/services/calendar.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import * as FlightAction from '../../../redux/actions/flight.actions';
import { FlightInfoService } from '../../services/flight-info.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  public flight$: Observable<IFlightState>;

  public dates: ICalendar[];

  public flights: Flights | undefined;

  public from: Airport | undefined;

  public destination: Airport | undefined;

  public curFlights: Flights | undefined;

  public startDate: Date | null;

  @Input() isForward: boolean;

  public flightData: Flight | undefined;

  public isSelected: boolean = false;

  constructor(
    private readonly store: Store,
    private readonly flightInfoService: FlightInfoService,
  ) {}

  isCurrentDate(item: ICalendar): boolean {
    /*
    if (item !== null && this.startDate !== null) {
      if (new Date(item.date).getDate() === new Date(this.startDate).getDate()) {
        // this.flightData = item.flight;
        return true;
      }
    }
    */
    return false;
  }

  ngOnInit(): void {
    this.flight$ = this.store.select(FlightSelect.selectFlight);

    this.flight$
      .subscribe((data) => {
        if (this.isForward) {
          this.from = data.from?.form;
          this.destination = data.from?.to;
          this.startDate = data.startDate;
          // this.curFlights = data.from?
          //  .filter((el) => el.destination === data.destination?.id);
          this.flights = data.from?.otherFlights;
          this.dates = this.initDateArray(data);
          console.log(this.dates);
        } else {
          this.from = data.destination?.form;
          this.destination = data.destination?.to;
          this.startDate = data.endDate;
          // this.curFlights = data.destination?.flights
          //  .filter((el) => el.destination === data.from?.id);
          this.flights = data.destination?.otherFlights;
          this.dates = this.initDateArray(data);
        }
      });

  }

  /*
  slideClick(info: IFlight | undefined) {
    if (info) {
      if (this.isForward) {
        this.store
          .dispatch(FlightAction.changeStartDateFlight({
            startDate: new Date(info.startDate),
          }));
      } else {
        this.store
          .dispatch(FlightAction.changeEndDateFlight({
            endDate: new Date(info.startDate),
          }));
      }
      // this.flightData = info;
    } else {
      this.flightData = undefined;
    }
  }
  */
  private initDateArray(flightData: IFlightState): ICalendar[] {
    const dates: ICalendar[] = [];
    for (let i = -5; i <= 5; i += 1) {
      if (this.flights !== undefined && i !== 0) {
        dates.push({ date: this.flights[i].takeoffDate, flight: flightData.from });
      } else {
        dates.push({ date: flightData.from?.takeoffDate, flight: flightData.from });
      }
      /*
      const flight = this.curFlights?.filter(
        (el) => new Date(el.startDate).getDate() === new Date(curDate).getDate(),
      )[0];
      dates.push({ date: new Date(curDate), flight });
      curDate.setDate(curDate.getDate() + 1);
      */
    }
    return dates;
  }

  editFlight() {
    this.isSelected = !this.isSelected;
  }

  selectFlight(flight: Flight) {
    if (flight !== undefined) {
      if (this.isForward) {
        this.store.dispatch(FlightAction.updateDirectFlight({ selectedDirectFlight: flight }));
      } else {
        this.store.dispatch(FlightAction.updateReverseFlight({ selectedReverseFlight: flight }));
      }
    } else if (this.isForward) {
      this.store.dispatch(FlightAction.updateDirectFlight({ selectedDirectFlight: null }));
    } else {
      this.store.dispatch(FlightAction.updateReverseFlight({ selectedReverseFlight: null }));
    }
    this.isSelected = !this.isSelected;
  }

}
