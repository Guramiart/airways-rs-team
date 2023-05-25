import { IUser } from '../services/user.model';
import { Currency } from '../shared/enums/currency';
import { DateFormat } from '../shared/enums/date-format';
import { Passengers } from '../airways/models/passengers';
import { FlightTypes } from '../shared/enums/flight-types';
import { Flight, Price } from '../services/flight.model';

export interface AppState {
  flights: Flight,
  cart: CartState,
  settings: SettingsState,
}

export interface IFlightState {
  from: Flight,
  destination: Flight,
  startDate: string,
  endDate: string,
  passengers: Passengers,
  flightType: FlightTypes,
  selectedDirectFlight: Flight,
  selectedReverseFlight: Flight,
  totalCost: Price,
}

export interface SettingsState {
  dateFormat: DateFormat,
  currency: Currency,
  isModalOpen: boolean,
  authUser:IUser | undefined
}

export interface CartState {
  flights: CartFlight[];
}

export interface CartFlight {
  forward: Flight,
  reverse: Flight,
}

export const initialFlightState: IFlightState = {
  from: null,
  destination: null,
  startDate: '',
  endDate: '',
  passengers: null,
  flightType: FlightTypes.ROUND,
  selectedDirectFlight: null,
  selectedReverseFlight: null,
  totalCost: null,
};

export const initialSettingState: SettingsState = {
  dateFormat: DateFormat.MM_DD_YYYY,
  currency: Currency.EUR,
  isModalOpen: false,
  authUser: undefined,
};

export const initialCartState: CartState = {
  flights: [],
};
