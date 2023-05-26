import { createAction, props } from '@ngrx/store';
import { Flight } from 'src/app/services/flight.model';
import { FlightTypes } from 'src/app/shared/enums/flight-types';

const GET_FLIGHTS = '[Selected-Flights] Get flights';
const UPDATE_DIRECT_FLIGHT = '[Selected-Flights] Update direct flights';
const UPDATE_REVERSE_FLIGHT = '[Selected-Flights] Update reverse flights';
const UPDATE_FLIGHT_TYPE = '[Selected-Flights] Update flight type';
const CLEAR_STORE = '[Selected-Flight] Clear store';

export const getFlights = createAction(GET_FLIGHTS);

export const updateDirect = createAction(
  UPDATE_DIRECT_FLIGHT,
  props<{
    flight: Flight,
  }>(),
);

export const updateReverse = createAction(
  UPDATE_REVERSE_FLIGHT,
  props<{
    flight: Flight,
  }>(),
);

export const updateType = createAction(
  UPDATE_FLIGHT_TYPE,
  props<{
    flightType: FlightTypes,
  }>(),
);

export const clearStore = createAction(CLEAR_STORE);
