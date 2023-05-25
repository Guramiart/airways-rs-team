import { createReducer, on } from '@ngrx/store';
import * as PassengersActions from '../actions/passengers.action';
import { PassengersState, initialPassengerState } from '../state.model';

export const passengerReducer = createReducer(
  initialPassengerState,
  on(PassengersActions.getPassengers, (state: PassengersState): PassengersState => ({ ...state })),
  on(
    PassengersActions.updatePassengers,
    (state: PassengersState, { passengers }): PassengersState => ({
      ...state,
      passengers,
    }),
  ),
);
