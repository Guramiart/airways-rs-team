import { IUser } from '../services/user.model';
import { Currency } from '../shared/enums/currency';
import { DateFormat } from '../shared/enums/date-format';
import { ICity } from '../services/cities.model';
import { Passengers } from '../airways/models/passengers';
import { FlightTypes } from '../shared/enums/flight-types';

export interface AppState {
  flights: FlightState,
  settings: SettingsState,
}

export interface FlightState {
  from: ICity | null,
  destination: ICity | null,
  startDate: Date | null,
  endDate: Date | null,
  passengers: Passengers | null,
  type: FlightTypes,
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
        start: '03:47',
        end: '23:25',
        price: 142.23,
        seats: 12,
      },
      {
        number: 1902,
        destination: 3,
        start: '05:25',
        end: '19:34',
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
        start: '04:47',
        end: '00:12',
        price: 112.41,
        seats: 32,
      },
      {
        number: 11356,
        destination: 2,
        start: '10:54',
        end: '12:34',
        price: 56.37,
        seats: 120,
      }],
  },
  startDate: null,
  endDate: null,
  passengers: null,
  type: FlightTypes.ROUND,
};

export const initialSettingState: SettingsState = {
  dateFormat: DateFormat.MM_DD_YYYY,
  currency: Currency.EUR,
  isModalOpen: false,
  authUser: undefined,
};
