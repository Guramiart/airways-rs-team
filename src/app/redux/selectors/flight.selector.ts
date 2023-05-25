import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IFlightState, SelectedFlight } from '../state.model';

const selectFlights = createFeatureSelector<IFlightState>('flights');

const selectSFlights = createFeatureSelector<SelectedFlight>('selectedFlight');

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

export const selectTotalCost = createSelector(
  selectFlights,
  (state: IFlightState) => state.totalCost,
);

export const selectSelectedFlight = createSelector(
  selectSFlights,
  (state: SelectedFlight) => state,
);
