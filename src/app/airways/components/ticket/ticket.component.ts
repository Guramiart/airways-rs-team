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

  public flights$: Observable<FlightState> | undefined;

  public from: ICity | null;

  public destination: ICity | null;

  public curFlight: IFlight | undefined;

  @Input() isForward: boolean;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.flights$ = this.store.select(FlightSelect.selectFlight);
    this.flights$
      .subscribe((data) => {
        if (this.isForward) {
          this.from = data.from;
          this.destination = data.destination;
          this.curFlight = data.from?.flights
            .filter((el) => el.destination === data.destination?.id)[0];
        } else {
          this.from = data.destination;
          this.destination = data.from;
          this.curFlight = data.destination?.flights
            .filter((el) => el.destination === data.from?.id)[0];
        }
      });
  }

}
