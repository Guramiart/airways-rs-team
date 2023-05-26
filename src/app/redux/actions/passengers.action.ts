import { createAction, props } from '@ngrx/store';
import { Passengers } from 'src/app/airways/models/passengers';

const GET_PASSENGERS = '[Passengers] Get passengers';
const UPDATE_PASSENGERS = '[Passengers] Update passengers';
const CLEAR_STORE = '[Passengers] Clear store';

export const getPassengers = createAction(GET_PASSENGERS);

export const updatePassengers = createAction(
  UPDATE_PASSENGERS,
  props<{
    passengers: Passengers,
  }>(),
);

export const clearStore = createAction(CLEAR_STORE);
