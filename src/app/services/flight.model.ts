export interface FlightRequest {
  fromKey: string,
  toKey: string,
  forwardDate: string,
  backDate: string,
}

export interface Airport {
  key: string,
  name: string,
  city: string,
  gmt: string,
  country: string,
}

export interface Flight {
  seats: Seats,
  flightNumber: string,
  timeMins: number,
  form: Airport,
  to: Airport,
  takeoffDate: string,
  landingDate: string,
  price: Price,
  otherFlights: Flights,
}

export interface Flights {
  [key: string]: Flight
}

export interface Seats {
  total: number;
  avaible: number;
}

export interface Price {
  [key: string]: number,
  eur: number,
  usd: number,
  rub: number,
  pln: number,
}
