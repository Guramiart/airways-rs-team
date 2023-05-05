import { createAction, props } from '@ngrx/store';
import { Passengers } from 'src/app/airways/models/passengers';
import { ICity } from 'src/app/services/cities.model';

const GET_FLIGHTS = '[Flight] Get flights';
const UPDATE_STORE = '[Flight] Update flights';
const CHANGE_FROM_FLIGHT = '[Flight] Change from';
const CHANGE_DESTINATION_FLIGHT = '[Flight] Change destination';
const CHANGE_START_DATE = '[Flight] Change start date';
const CHANGE_END_DATE = '[Flight] Change end date';

export const getFlights = createAction(GET_FLIGHTS);

export const updateFlights = createAction(
  UPDATE_STORE,
  props<{
    from: ICity,
    destination: ICity,
    startDate: Date,
    endDate: Date,
    passengers: Passengers,
  }>(),
);

export const changeFromFlight = createAction(
  CHANGE_FROM_FLIGHT,
  props<{ from: ICity }>(),
);

export const changeDestinationFlight = createAction(
  CHANGE_DESTINATION_FLIGHT,
  props<{ destination: ICity }>(),
);

export const changeStartDateFlight = createAction(
  CHANGE_START_DATE,
  props<{ startDate: Date }>(),
);

export const changeEndDateFlight = createAction(
  CHANGE_END_DATE,
  props<{ endDate: Date }>(),
);
