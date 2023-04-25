import { Currency } from '../shared/enums/currency';
import { DateFormat } from '../shared/enums/date-format';

export interface SettingsState {
  dateFormat: DateFormat,
  currency: Currency,
  isModalOpen: boolean
}

export const initialSettingState: SettingsState = {
  dateFormat: DateFormat.MM_DD_YYYY,
  currency: Currency.EUR,
  isModalOpen:false
};
