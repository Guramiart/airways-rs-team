import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SelectedFlight } from '../state.model';

const selectFlight = createFeatureSelector<SelectedFlight>('selectedFlight');

export const selectFlights = createSelector(
  selectFlight,
  (state: SelectedFlight) => state,
);

export const selectDirectFlights = createSelector(
  selectFlight,
  (state: SelectedFlight) => state.direct,
);

export const selectReverseFlights = createSelector(
  selectFlight,
  (state: SelectedFlight) => state.reverse,
);

export const selectFlightType = createSelector(
  selectFlight,
  (state: SelectedFlight) => state.flightType,
);
