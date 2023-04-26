import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightState } from '../state.model';

const selectFlights = createFeatureSelector<FlightState>('flights');

export const selectFromFlight = createSelector(
  selectFlights,
  (state: FlightState) => state.from,
);

export const selectDestinationFlight = createSelector(
  selectFlights,
  (state: FlightState) => state.destination,
);
