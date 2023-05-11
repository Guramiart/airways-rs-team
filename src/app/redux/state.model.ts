import { IUser } from '../services/user.model';
import { Currency } from '../shared/enums/currency';
import { DateFormat } from '../shared/enums/date-format';
import { ICity } from '../services/cities.model';
import { Passengers } from '../airways/models/passengers';
import { FlightTypes } from '../shared/enums/flight-types';
import { IFlight } from '../services/flight.model';

export interface AppState {
  flights: FlightState,
  settings: SettingsState,
}

export interface FlightState {
  from: ICity,
  destination: ICity,
  startDate: Date | null,
  endDate: Date | null,
  passengers: Passengers | null,
  type: FlightTypes,
  selectedDirectFlight: IFlight | null,
  selectedReverseFlight: IFlight | null,
}

export interface SettingsState {
  dateFormat: DateFormat,
  currency: Currency,
  isModalOpen: boolean,
  authUser:IUser | undefined
}

export const initialFlightState: FlightState = { // test state TODO: remove
  from: {
    id: 1,
    nameEn: 'Karaganda',
    nameRu: 'Караганда',
    airportEn: 'Sary-Arka International Airport',
    airportRu: 'Аэропорт Сары-Арка',
    abbreviation: 'KGF',
    GMT: '+6',
    location: 'Central Asia',
    isOpen: true,
    priceTarif: 1.4,
    flights: [
      {
        number: 3547,
        destination: 2,
        startDate: '2023-05-05T02:31:42',
        endDate: '2023-05-05T23:29:42',
        price: 142.23,
        seats: 12,
      },
      {
        number: 1902,
        destination: 3,
        startDate: '2023-05-05T02:31:42',
        endDate: '2023-05-05T23:29:42',
        price: 114.12,
        seats: 65,
      }],
  },
  destination: {
    id: 3,
    nameEn: 'Moscow',
    nameRu: 'Москва',
    airportEn: 'Sheremetievo',
    airportRu: 'Шереметьево',
    abbreviation: 'SVO',
    GMT: '+6',
    location: 'West Europe',
    isOpen: true,
    priceTarif: 1.1,
    flights: [
      {
        number: 1901,
        destination: 1,
        startDate: '2023-05-05T02:31:42',
        endDate: '2023-05-05T23:29:42',
        price: 112.41,
        seats: 32,
      },
      {
        number: 11356,
        destination: 2,
        startDate: '2023-05-05T02:31:42',
        endDate: '2023-05-05T23:29:42',
        price: 56.37,
        seats: 120,
      }],
  },
  startDate: null,
  endDate: null,
  passengers: null,
  type: FlightTypes.ROUND,
  selectedDirectFlight: null,
  selectedReverseFlight: null,
};

export const initialSettingState: SettingsState = {
  dateFormat: DateFormat.MM_DD_YYYY,
  currency: Currency.EUR,
  isModalOpen: false,
  authUser: undefined,
};
