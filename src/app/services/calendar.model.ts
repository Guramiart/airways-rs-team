import { IFlight } from './flight.model';

export interface Calendar {
  date: Date,
  flight: IFlight | undefined,
}
