import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PassengersState } from '../state.model';

const selectPassenger = createFeatureSelector<PassengersState>('passengers');

export const selectPassengers = createSelector(
  selectPassenger,
  (state: PassengersState) => state.passengers,
);
