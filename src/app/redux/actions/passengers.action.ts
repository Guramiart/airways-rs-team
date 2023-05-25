import { createAction, props } from '@ngrx/store';
import { Passengers } from 'src/app/airways/models/passengers';

const GET_PASSENGERS = '[Passengers] Get passengers';
const UPDATE_PASSENGERS = '[Passengers] Update passengers';

export const getPassengers = createAction(GET_PASSENGERS);

export const updatePassengers = createAction(
  UPDATE_PASSENGERS,
  props<{
    passengers: Passengers,
  }>(),
);
