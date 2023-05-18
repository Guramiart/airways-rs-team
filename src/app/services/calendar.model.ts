import { Flight, IFlight } from './flight.model';

export interface Calendar {
  date: Date,
  flight: IFlight | undefined,
}

export interface ICalendar {
  date: string | undefined,
  flight: Flight | null,
}
