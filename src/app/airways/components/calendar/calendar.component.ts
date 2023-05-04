import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FlightState } from 'src/app/redux/state.model';
import { IFlight } from 'src/app/services/flight.model';
import { ICity } from 'src/app/services/cities.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';
import { FlightInfoService } from '../../services/flight-info.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  public dates: { date: Date, flight: IFlight | undefined }[];

  public slideConfig = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  public flight$: Observable<FlightState>;

  public from: ICity | null;

  public destination: ICity | null;

  public curFlights: IFlight[] | undefined;

  @Input() isForward: boolean;

  constructor(private store: Store, private flightInfoService: FlightInfoService) {}

  isCurrentDate(curDate: Date | null, date: Date | null): boolean {
    if (date !== null) {
      return new Date(date).getDate() === curDate?.getDate();
    }
    return false;
  }

  slideClick(info: any) {
    this.flightInfoService.setFlightInfo(info);
  }

  ngOnInit(): void {
    this.flight$ = this.store.select(FlightSelect.selectFlight);
    this.flight$
      .subscribe((data) => {
        if (this.isForward) {
          this.from = data.from;
          this.destination = data.destination;
          this.curFlights = data.from?.flights
            .filter((el) => el.destination === data.destination?.id);
        } else {
          this.from = data.destination;
          this.destination = data.from;
          this.curFlights = data.destination?.flights
            .filter((el) => el.destination === data.from?.id);
        }
      });
    this.dates = this.initDateArray();
  }

  private initDateArray(): { date: Date, flight: IFlight | undefined }[] {
    const dates = [];
    const curDate = new Date();
    for (let i = 0; i <= 10; i += 1) {
      // eslint-disable-next-line max-len
      const flight = this.curFlights?.filter((el) => new Date(el.startDate).getDate() === new Date(curDate).getDate())[0];
      dates.push({ date: new Date(curDate), flight });
      curDate.setDate(curDate.getDate() + 1);
    }
    return dates;
  }

}
