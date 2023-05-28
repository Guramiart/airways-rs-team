import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Airport, Flight } from 'src/app/services/flight.model';
import { FlightInfoService } from '../../services/flight-info.service';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss'],
})
export class FlightInfoComponent implements OnInit {

  @Input() isForward: boolean;

  @Input() from: Airport | undefined;

  @Input() destination: Airport | undefined;

  @Input() flightData: Flight | null;

  @Output() selectEvent = new EventEmitter<Flight>();

  public flight$: Observable<Flight>;

  public isSelected: boolean = false;

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

  selectFlight(flight: Flight) {
    this.selectEvent.emit(flight);
    this.isSelected = !this.isSelected;
  }

}
