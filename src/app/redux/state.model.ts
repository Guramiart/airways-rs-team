import { IUser } from '../services/user.model';
import { Currency } from '../shared/enums/currency';
import { DateFormat } from '../shared/enums/date-format';
import { Passengers } from '../airways/models/passengers';
import { FlightTypes } from '../shared/enums/flight-types';
import { Flight } from '../services/flight.model';

export interface AppState {
  flights: Flight,
  settings: SettingsState,
}

export interface IFlightState {
  from: Flight | null,
  destination: Flight | null,
  startDate: string,
  endDate: string,
  passengers: Passengers | null,
  flightType: FlightTypes | null,
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
  startDate: '',
  endDate: '',
  passengers: null,
  flightType: null,
  selectedDirectFlight: null,
  selectedReverseFlight: null,
};

export const initialSettingState: SettingsState = {
  dateFormat: DateFormat.MM_DD_YYYY,
  currency: Currency.EUR,
  isModalOpen: false,
  authUser: undefined,
};
