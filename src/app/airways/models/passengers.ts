export interface Passengers {
  passengers: {
    adult: {
      name: string,
      count: number,
    },
    child: {
      name: string,
      count: number,
    },
    infant: {
      name: string,
      count: number,
    },
  },
  total: number,
}
