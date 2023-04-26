import { createAction, props } from '@ngrx/store';
import { ICity } from 'src/app/services/cities.model';

const GET_FLIGHTS = '[Flight] Get flights';
const CHANGE_FROM_FLIGHT = '[Flight] Change from';
const CHANGE_DESTINATION_FLIGHT = '[Flight] Change destination';

export const getFlights = createAction(GET_FLIGHTS);

export const changeFromFlight = createAction(
  CHANGE_FROM_FLIGHT,
  props<{ from: ICity }>(),
);

export const changeDestinationFlight = createAction(
  CHANGE_DESTINATION_FLIGHT,
  props<{ destination: ICity }>(),
);
