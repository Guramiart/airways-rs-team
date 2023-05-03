import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FlightState } from 'src/app/redux/state.model';
import { IFlight } from 'src/app/services/flight.model';
import { ICity } from 'src/app/services/cities.model';
import * as FlightSelect from '../../../redux/selectors/flight.selector';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {

  public dates: Date[];

  public slideConfig = {
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  public flight$: Observable<FlightState> | undefined;

  public from: ICity | null;

  public destination: ICity | null;

  public curFlight: IFlight[] | undefined;

  @Input() isForward: boolean;

  constructor(private store: Store) {}

  isCurrentDate(curDate: Date | null, date: Date | null): boolean {
    if (date !== null) {
      return new Date(date).getDate() === curDate?.getDate();
    }
    return false;
  }

  ngOnInit(): void {
    this.dates = this.initDateArray();
    this.flight$ = this.store.select(FlightSelect.selectFlight);
    this.flight$
      .subscribe((data) => {
        if (this.isForward) {
          this.from = data.from;
          this.destination = data.destination;
          this.curFlight = data.from?.flights
            .filter((el) => el.destination === data.destination?.id);
        } else {
          this.from = data.destination;
          this.destination = data.from;
          this.curFlight = data.destination?.flights
            .filter((el) => el.destination === data.from?.id);
        }
      });
  }

  private initDateArray(): Date[] {
    const dates = [];
    const curDate = new Date();
    for (let i = 0; i <= 10; i += 1) {
      dates.push(new Date(curDate));
      curDate.setDate(curDate.getDate() + 1);
    }
    return dates;
  }

}
