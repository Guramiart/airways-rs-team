import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SettingsState } from '../state.model';

const selectSetting = createFeatureSelector<SettingsState>('settings');

export const selectDateFormat = createSelector(
  selectSetting,
  (state: SettingsState) => state.dateFormat,
);

export const selectCurrency = createSelector(
  selectSetting,
  (state: SettingsState) => state.currency,
);

export const getModal = createSelector(
  selectSetting,
  (state:SettingsState) => state.isModalOpen,
);
