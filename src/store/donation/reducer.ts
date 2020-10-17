import { Reducer } from 'redux';
import { Donation } from '../state';
import { DonationActionTypes, SELECT_PAYMENT_METHOD, SELECT_TAX_DEDUCTION } from './types';

const initialState: Donation = {
  recurring: true,
  donor: {
    taxDeduction: false,
    newsletter: false,
  }
}

/**
 * The reducer is a pure function that takes in the previous state,
 * performs an action on that state and returns the new updated state.
 *
 * @param {Donation} state The current state of the Layout
 * @param {DonationActionTypes} action An action mutating the current Layout state
 */

export const donationReducer: Reducer<Donation, DonationActionTypes> = (
  state: Donation = initialState,
  action: DonationActionTypes,
) => {
  switch (action.type) {
    case SELECT_PAYMENT_METHOD:
      return { ...state, method: action.payload.method }
    case SELECT_TAX_DEDUCTION:
      return { ...state, taxDeduction: action.payload.taxDeduction};
    default:
      return state;
  }
}