import { Currency } from '../shared/enums/currency';
import { DateFormat } from '../shared/enums/date-format';

export interface SettingsState {
  dateFormat: DateFormat,
  currency: Currency,
}

export const initialSettingState: SettingsState = {
  dateFormat: DateFormat.MM_DD_YYYY,
  currency: Currency.EUR,
};
