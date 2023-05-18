import { IUser } from '../services/user.model';
import { Currency } from '../shared/enums/currency';
import { DateFormat } from '../shared/enums/date-format';
import { ICity } from '../services/cities.model';
import { Passengers } from '../airways/models/passengers';
import { FlightTypes } from '../shared/enums/flight-types';
import { Flight, IFlight } from '../services/flight.model';

export interface AppState {
  flights: Flight,
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

export interface IFlightState {
  from: Flight | null,
  destination: Flight | null,
  startDate: Date | null,
  endDate: Date | null,
  passengers: Passengers | null,
  type: FlightTypes,
  selectedDirectFlight: Flight | null,
  selectedReverseFlight: Flight | null,
}

export interface SettingsState {
  dateFormat: DateFormat,
  currency: Currency,
  isModalOpen: boolean,
  authUser:IUser | undefined
}

export const initialFlightState: IFlightState = {
  from: null,
  destination: null,
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
