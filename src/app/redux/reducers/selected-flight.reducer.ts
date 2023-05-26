import { createReducer, on } from '@ngrx/store';
import { SelectedFlight, initialSelectedFlightState } from '../state.model';
import * as SelectedActions from '../actions/selected-flight.action';

export const selectedFlightReducer = createReducer(
  initialSelectedFlightState,
  on(SelectedActions.getFlights, (state: SelectedFlight): SelectedFlight => ({ ...state })),
  on(
    SelectedActions.updateDirect,
    (state: SelectedFlight, { flight }): SelectedFlight => ({
      ...state,
      direct: flight,
    }),
  ),
  on(
    SelectedActions.updateReverse,
    (state: SelectedFlight, { flight }): SelectedFlight => ({
      ...state,
      reverse: flight,
    }),
  ),
  on(
    SelectedActions.updateType,
    (state: SelectedFlight, { flightType }): SelectedFlight => ({
      ...state,
      flightType,
    }),
  ),
  on(
    SelectedActions.clearStore,
    (state: SelectedFlight): SelectedFlight => ({
      ...state,
      direct: initialSelectedFlightState.direct,
      reverse: initialSelectedFlightState.reverse,
      flightType: initialSelectedFlightState.flightType,
    }),
  ),
);
