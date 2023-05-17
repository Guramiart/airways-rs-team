import { createReducer, on } from '@ngrx/store';
import { IFlightState, initialFlightState } from '../state.model';

import * as FlightActions from '../actions/flight.actions';

export const flightReducer = createReducer(
  initialFlightState,
  on(FlightActions.updatePassengers, (state: IFlightState, { passengers }):IFlightState => ({
    ...state,
    passengers,
  })),
  on(FlightActions.getFlights, (state: IFlightState): IFlightState => ({ ...state })),
  on(
    FlightActions.updateFlights,
    (state: IFlightState, {
      from, destination, startDate, endDate, passengers,
    }): IFlightState => ({
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
    (state: IFlightState, { from }): IFlightState => ({
      ...state,
      from,
    }),
  ),
  on(
    FlightActions.changeDestinationFlight,
    (state: IFlightState, { destination }): IFlightState => ({
      ...state,
      destination,
    }),
  ),
  on(
    FlightActions.changeStartDateFlight,
    (state: IFlightState, { startDate }): IFlightState => ({
      ...state,
      startDate,
    }),
  ),
  on(
    FlightActions.changeEndDateFlight,
    (state: IFlightState, { endDate }): IFlightState => ({
      ...state,
      endDate,
    }),
  ),
  on(
    FlightActions.updateDirectFlight,
    (state: IFlightState, { selectedDirectFlight }): IFlightState => ({
      ...state,
      selectedDirectFlight,
    }),
  ),
  on(
    FlightActions.updateReverseFlight,
    (state: IFlightState, { selectedReverseFlight }): IFlightState => ({
      ...state,
      selectedReverseFlight,
    }),
  ),
);
