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
  total: number,
  fare: number,
  tax: number,
}

export interface Ticket {
  flight: string,
  direction: string,
  date: string,
  time: string,
  prices: {
    adult: Passenger[],
    child: Passenger[],
    infant: Passenger[],
  }
}

export interface Passenger {
  name: string,
  fare: number,
  tax: number,
  place: string | null,
}
