import { createAction, props } from '@ngrx/store';
import { Passengers } from 'src/app/airways/models/passengers';
import { ICity } from 'src/app/services/cities.model';
import { IFlight } from 'src/app/services/flight.model';

const GET_FLIGHTS = '[Flight] Get flights';
const UPDATE_STORE = '[Flight] Update flights';
const CHANGE_FROM_FLIGHT = '[Flight] Change from';
const CHANGE_DESTINATION_FLIGHT = '[Flight] Change destination';
const CHANGE_START_DATE = '[Flight] Change start date';
const CHANGE_END_DATE = '[Flight] Change end date';
const UPDATE_PASSENGERS = '[fliht] Update passengers';
const UPDATE_DIRECT_FLIGHT = '[fliht] Update direct flight';
const UPDATE_REVERSE_FLIGHT = '[fliht] Update reverse flight';

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

export const updatePassengers = createAction(
  UPDATE_PASSENGERS,
  props<{
    passengers: Passengers,
  }>(),
);

export const updateDirectFlight = createAction(
  UPDATE_DIRECT_FLIGHT,
  props<{
    selectedDirectFlight: IFlight | null,
  }>(),
);

export const updateReverseFlight = createAction(
  UPDATE_REVERSE_FLIGHT,
  props<{
    selectedReverseFlight: IFlight | null,
  }>(),
);
