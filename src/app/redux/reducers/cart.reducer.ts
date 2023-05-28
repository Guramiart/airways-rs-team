import { createReducer, on } from '@ngrx/store';
import { CartState, initialCartState } from '../state.model';
import * as CartActions from '../actions/cart.actions';

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.getFlights, (state: CartState): CartState => ({ ...state })),
  on(
    CartActions.addFlights,
    (state: CartState, { flights }): CartState => ({
      ...state,
      flights: [...state.flights, flights],
    }),
  ),
  on(
    CartActions.addNewPrice,
    (state: CartState, { flights }): CartState => ({
      ...state,
      flights: [...flights],
    }),
  ),
);
