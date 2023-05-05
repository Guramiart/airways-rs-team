import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from 'src/app/services/cities.model';
import { IFlight } from 'src/app/services/flight.model';
import { FlightInfoService } from '../../services/flight-info.service';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss'],
})
export class FlightInfoComponent implements OnInit {

  @Input() from: ICity;

  @Input() destination: ICity;

  @Input() flightData: IFlight | undefined;

  public flight$: Observable<IFlight | undefined>;

  constructor(private flightService: FlightInfoService) {}

  ngOnInit(): void {
    this.flight$ = this.flightService.getFlightInfo$();
  }

  getDuration(start: string, end: string): string {
    const duration = new Date(end).getTime() - new Date(start).getTime();
    const hours = Math.floor(duration / (3600 * 1000));
    const minutes = (duration - (hours * 3600 * 1000)) / (60 * 1000);
    return `${hours}h ${minutes}min`;
  }

}
