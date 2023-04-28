import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightState } from '../state.model';

const selectFlights = createFeatureSelector<FlightState>('flights');

export const selectFlight = createSelector(
  selectFlights,
  (state: FlightState) => state,
);

export const selectFromFlight = createSelector(
  selectFlights,
  (state: FlightState) => state.from,
);

export const selectDestinationFlight = createSelector(
  selectFlights,
  (state: FlightState) => state.destination,
);

export const selectStartDateFlight = createSelector(
  selectFlights,
  (state: FlightState) => state.startDate,
);

export const selectEndDateFlight = createSelector(
  selectFlights,
  (state: FlightState) => state.endDate,
);
