import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FlightState } from 'src/app/redux/state.model';
import { IFlight } from 'src/app/services/flight.model';
import { ICity } from 'src/app/services/cities.model';
import { Calendar } from 'src/app/services/calendar.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import * as FlightAction from '../../../redux/actions/flight.actions';
import { FlightInfoService } from '../../services/flight-info.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  private flight$: Observable<FlightState>;

  public dates: Calendar[];

  public slideConfig = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  public from: ICity;

  public destination: ICity;

  public curFlights: IFlight[] | undefined;

  public startDate: Date | null;

  @Input() isForward: boolean;

  public flightData: IFlight | undefined;

  constructor(
    private readonly store: Store,
    private readonly flightInfoService: FlightInfoService,
  ) {}

  isCurrentDate(item: Calendar): boolean {
    if (item !== null && this.startDate !== null) {
      if (new Date(item.date).getDate() === new Date(this.startDate).getDate()) {
        this.flightData = item.flight;
        return true;
      }
    }
    return false;
  }

  ngOnInit(): void {
    this.flight$ = this.store.select(FlightSelect.selectFlight);
    this.flight$
      .subscribe((data) => {
        if (this.isForward) {
          this.from = data.from;
          this.destination = data.destination;
          this.startDate = data.startDate;
          this.curFlights = data.from?.flights
            .filter((el) => el.destination === data.destination?.id);
        } else {
          this.from = data.destination;
          this.destination = data.from;
          this.startDate = data.endDate;
          this.curFlights = data.destination?.flights
            .filter((el) => el.destination === data.from?.id);
        }
      });
    this.dates = this.initDateArray();
  }

  slideClick(info: IFlight | undefined) {
    if (info) {
      if (this.isForward) {
        this.store
          .dispatch(FlightAction.changeStartDateFlight({
            startDate: new Date(info.startDate),
          }));
      } else {
        console.log(true);
        this.store
          .dispatch(FlightAction.changeEndDateFlight({
            endDate: new Date(info.startDate),
          }));
      }
      this.flightData = info;
    } else {
      this.flightData = undefined;
    }
  }

  private initDateArray(): Calendar[] {
    const dates = [];
    const curDate = new Date();
    for (let i = 0; i <= 10; i += 1) {
      const flight = this.curFlights?.filter(
        (el) => new Date(el.startDate).getDate() === new Date(curDate).getDate(),
      )[0];
      dates.push({ date: new Date(curDate), flight });
      curDate.setDate(curDate.getDate() + 1);
    }
    return dates;
  }

}
