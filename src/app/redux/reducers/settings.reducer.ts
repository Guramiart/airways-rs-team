import { createReducer, on } from '@ngrx/store';
import { SettingsState, initialSettingState } from '../state.model';
import * as SettingActions from '../actions/settings.actions';

export const settingReducer = createReducer(
  initialSettingState,
  on(SettingActions.getSettings, (state: SettingsState): SettingsState => ({ ...state })),
  on(
    SettingActions.changeDate,
    (state: SettingsState, { dateFormat }): SettingsState => ({
      ...state,
      dateFormat,
    }),
  ),
  on(
    SettingActions.changeCurrency,
    (state: SettingsState, { currency }): SettingsState => ({
      ...state,
      currency,
    }),
  ),
);
