import { createReducer, on } from '@ngrx/store';
import { FlightState, initialFlightState } from '../state.model';

import * as FlightActions from '../actions/flight.actions';

export const flightReducer = createReducer(
  initialFlightState,
  on(FlightActions.getFlights, (state: FlightState): FlightState => ({ ...state })),
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
);
