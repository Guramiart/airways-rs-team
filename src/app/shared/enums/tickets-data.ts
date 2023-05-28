import { Price } from 'src/app/services/flight.model';

export interface OneTicket {
  numberFlight: string,
  flight: string[],
  type: string,
  date: string[],
  passengers: string[],
  price: string,
}

export interface AgePassenger {
  count: number,
  total: Price,
  fare: Price,
  tax: Price,
}

export interface Passenger {
  name: string,
  fare: number,
  tax: number,
  place: string | null,
}
