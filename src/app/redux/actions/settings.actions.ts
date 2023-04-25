import { createAction, props } from '@ngrx/store'; 
import { Currency } from 'src/app/shared/enums/currency';
import { DateFormat } from 'src/app/shared/enums/date-format';

const GET_SETTINGS = '[Settings] Get settings';
const CHANGE_DATE = '[Settings] Change date format';
const CHANGE_CURRENCY = '[Settings] Change currency';
const OPEN_MODAL = '[Modal] Open modal'

export const getSettings = createAction(GET_SETTINGS);

export const changeDate = createAction(
  CHANGE_DATE,
  props<{ dateFormat: DateFormat }>(),
);

export const changeCurrency = createAction(
  CHANGE_CURRENCY,
  props<{ currency: Currency }>(),
);

export const openModal = createAction(OPEN_MODAL)
