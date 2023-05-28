import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/services/user.model';
import { Currency } from 'src/app/shared/enums/currency';
import { DateFormat } from 'src/app/shared/enums/date-format';

const GET_SETTINGS = '[Settings] Get settings';
const CHANGE_DATE = '[Settings] Change date format';
const CHANGE_CURRENCY = '[Settings] Change currency';
const OPEN_MODAL = '[Modal] Open modal';
const SET_USER = '[Modal] Set auth user';

export const getSettings = createAction(GET_SETTINGS);

export const changeDate = createAction(
  CHANGE_DATE,
  props<{ dateFormat: DateFormat }>(),
);

export const changeCurrency = createAction(
  CHANGE_CURRENCY,
  props<{ currency: Currency }>(),
);

export const openModal = createAction(OPEN_MODAL);

export const setAuthUser = createAction(
  SET_USER,
  props<{ authUser:IUser | undefined }>(),
);
