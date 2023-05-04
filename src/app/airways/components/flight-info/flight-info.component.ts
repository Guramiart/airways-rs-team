import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFlight } from 'src/app/services/flight.model';
import { FlightInfoService } from '../../services/flight-info.service';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss'],
})
export class FlightInfoComponent implements OnInit {

  public flight: Observable<IFlight | undefined>;

  constructor(private flightService: FlightInfoService) {}

  ngOnInit(): void {
    this.flight = this.flightService.getFlightInfo$();
  }

}
