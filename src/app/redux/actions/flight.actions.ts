import { createAction, props } from '@ngrx/store';
import { Passengers } from 'src/app/airways/models/passengers';
import { Flight } from 'src/app/services/flight.model';
import { FlightTypes } from 'src/app/shared/enums/flight-types';

const GET_FLIGHTS = '[Flight] Get flights';
const UPDATE_STORE = '[Flight] Update flights';
const CHANGE_FROM_FLIGHT = '[Flight] Change from';
const CHANGE_DESTINATION_FLIGHT = '[Flight] Change destination';
const CHANGE_START_DATE = '[Flight] Change start date';
const CHANGE_END_DATE = '[Flight] Change end date';
const UPDATE_PASSENGERS = '[Flight] Update passengers';
const UPDATE_DIRECT_FLIGHT = '[Flight] Update direct flight';
const UPDATE_REVERSE_FLIGHT = '[Flight] Update reverse flight';

export const getFlights = createAction(GET_FLIGHTS);

export const updateFlights = createAction(
  UPDATE_STORE,
  props<{
    flightType: FlightTypes,
    from: Flight,
    destination: Flight,
    startDate: string,
    endDate: string,
    passengers: Passengers,
  }>(),
);

export const changeFromFlight = createAction(
  CHANGE_FROM_FLIGHT,
  props<{ from: Flight }>(),
);

export const changeDestinationFlight = createAction(
  CHANGE_DESTINATION_FLIGHT,
  props<{ destination: Flight }>(),
);

export const changeStartDateFlight = createAction(
  CHANGE_START_DATE,
  props<{ startDate: string }>(),
);

export const changeEndDateFlight = createAction(
  CHANGE_END_DATE,
  props<{ endDate: string }>(),
);

export const updatePassengers = createAction(
  UPDATE_PASSENGERS,
  props<{
    passengers: Passengers,
  }>(),
);

export const updateDirectFlight = createAction(
  UPDATE_DIRECT_FLIGHT,
  props<{
    selectedDirectFlight: Flight | null,
  }>(),
);

export const updateReverseFlight = createAction(
  UPDATE_REVERSE_FLIGHT,
  props<{
    selectedReverseFlight: Flight | null,
  }>(),
);
