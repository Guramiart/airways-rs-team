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

export const initialFlightState: FlightState = {
  from: null,
  destination: null,
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
