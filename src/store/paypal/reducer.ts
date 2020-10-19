import { Reducer } from 'redux';
import { PayPalState } from '../state';
import { PayPalActionTypes, SET_PAYPAL_LOADING, SET_PAYPAL_SUCCESS } from './types';

const initialState: PayPalState = {
  loading: false,
  success: false,
}

/**
 * The reducer is a pure function that takes in the previous state,
 * performs an action on that state and returns the new updated state.
 *
 * @param {PayPalState} state The current state of the Layout
 * @param {PayPalActionTypes} action An action mutating the current Layout state
 */

export const payPalReducer: Reducer<PayPalState, PayPalActionTypes> = (
  state: PayPalState = initialState,
  action: PayPalActionTypes,
) => {
  switch (action.type) {
    case SET_PAYPAL_LOADING:
      return { ...state, isLoading: action.payload.isLoading }
    case SET_PAYPAL_SUCCESS:
      return { ...state, isSuccess: action.payload.isSuccess};
    default:
      return state;
  }
}