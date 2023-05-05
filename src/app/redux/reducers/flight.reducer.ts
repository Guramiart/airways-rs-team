import { createReducer, on } from '@ngrx/store';
import { FlightState, initialFlightState } from '../state.model';

import * as FlightActions from '../actions/flight.actions';

export const flightReducer = createReducer(
  initialFlightState,
  on(FlightActions.getFlights, (state: FlightState): FlightState => ({ ...state })),
  on(
    FlightActions.updateFlights,
    (state: FlightState, {
      from, destination, startDate, endDate, passengers,
    }): FlightState => ({
      ...state,
      from,
      destination,
      startDate,
      endDate,
      passengers,
    }),
  ),
  on(
    FlightActions.changeFromFlight,
    (state: FlightState, { from }): FlightState => ({
      ...state,
      from,
    }),
  ),
  on(
    FlightActions.changeDestinationFlight,
    (state: FlightState, { destination }): FlightState => ({
      ...state,
      destination,
    }),
  ),
  on(
    FlightActions.changeStartDateFlight,
    (state: FlightState, { startDate }): FlightState => ({
      ...state,
      startDate,
    }),
  ),
  on(
    FlightActions.changeEndDateFlight,
    (state: FlightState, { endDate }): FlightState => ({
      ...state,
      endDate,
    }),
  ),
);
