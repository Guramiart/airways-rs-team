import { Currency } from '../shared/enums/currency';
import { DateFormat } from '../shared/enums/date-format';
import { ICity } from '../services/cities.model';

export interface AppState {
  flights: FlightState,
  settings: SettingsState,
}

export interface FlightState {
  from: ICity | null,
  destination: ICity | null,
}

export interface SettingsState {
  dateFormat: DateFormat,
  currency: Currency,
}

export const initialFlightState: FlightState = {
  from: null,
  destination: null,
};

export const initialSettingState: SettingsState = {
  dateFormat: DateFormat.MM_DD_YYYY,
  currency: Currency.EUR,
};
