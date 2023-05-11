import { IFlight } from './flight.model';

export interface ICity {
  id: number,
  nameEn: string,
  nameRu: string,
  airportEn: string,
  airportRu: string,
  abbreviation: string,
  GMT: string,
  location: string,
  isOpen: boolean,
  priceTarif: number,
  flights: IFlight[],
}
