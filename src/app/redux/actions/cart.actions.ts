import { createAction, props } from '@ngrx/store';
import { CartFlight } from '../state.model';

const GET_FLIGHTS = '[Cart] Get flights';
const ADD_FLIGHTS = '[Cart] Add flights';
const REMOVE_FLIGHTS = '[Cart] Remove flights';

export const getFlights = createAction(GET_FLIGHTS);

export const addFlights = createAction(
  ADD_FLIGHTS,
  props<{ flights: CartFlight }>(),
);

export const removeFlight = createAction(
  REMOVE_FLIGHTS,
  props<{ flight: null }>(),
);
