import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../state.model';

const selectCart = createFeatureSelector<CartState>('cart');

export const selectFlights = createSelector(
  selectCart,
  (state: CartState) => state,
);
