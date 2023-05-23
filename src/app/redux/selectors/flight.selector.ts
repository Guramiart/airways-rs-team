import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFlightState } from '../state.model';

const selectFlights = createFeatureSelector<IFlightState>('flights');

export const selectFlight = createSelector(
  selectFlights,
  (state: IFlightState) => state,
);

export const selectFromFlight = createSelector(
  selectFlights,
  (state: IFlightState) => state.from,
);

export const selectDestinationFlight = createSelector(
  selectFlights,
  (state: IFlightState) => state.destination,
);

export const selectStartDateFlight = createSelector(
  selectFlights,
  (state: IFlightState) => state.startDate,
);

export const selectEndDateFlight = createSelector(
  selectFlights,
  (state: IFlightState) => state.endDate,
);
