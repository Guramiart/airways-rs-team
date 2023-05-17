export interface IFlight {
  number: number,
  destination: number,
  startDate: string,
  endDate: string,
  price: number,
  seats: number,
}

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
  seats: {
    total: number,
    avaible: number,
  },
  flightNumber: string,
  timeMins: number,
  form: Airport,
  to: Airport,
  takeoffDate: string,
  landingDate: string,
  price: {
    eur: number,
    usd: number,
    rub: number,
    pln: number,
  }
  otherFlights: Flights,
}

export interface Flights {
  '-5': Flight,
  '-4': Flight,
  '-3': Flight,
  '-2': Flight,
  '-1': Flight,
  '1': Flight,
  '2': Flight,
  '3': Flight,
  '4': Flight,
  '5': Flight,
}
