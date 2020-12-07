import { Reducer } from 'redux';
import { Donation } from '../state';
import { DonationActionTypes, SELECT_PAYMENT_METHOD, SELECT_TAX_DEDUCTION, SUBMIT_DONOR_INFO, SET_SHARES, SET_SUM, SET_RECURRING, SET_KID, SET_DONOR_ID, SET_PAYMENT_PROVIDER_URL, RECURRING_DONATION} from './types';

const initialState: Donation = {
  recurring: RECURRING_DONATION.RECURRING,
  sum: 0,
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
      return { ...state, taxDeduction: action.payload.taxDeduction }
    case SUBMIT_DONOR_INFO:
      return { ...state,
        donor: {
          name: action.payload.name, 
          email: action.payload.email, 
          taxDeduction: action.payload.taxDeduction, 
          ssn: action.payload.ssn,
          newsletter: action.payload.newsletter 
        }
      }
    case SET_SHARES:
      return { ...state, shares: { ...action.payload.shares }}
    case SET_SUM:
      return { ...state, sum: action.payload.sum}
    case SET_RECURRING:
      return { ...state, recurring: action.payload.recurring }
    case SET_KID:
      return { ...state, kid: action.payload.kid }
    case SET_DONOR_ID:
      return { ...state, donor: { ...state.donor, donorID: action.payload.donorID }}
    case SET_PAYMENT_PROVIDER_URL: 
      return { ...state, paymentProviderURL: action.payload.url }
    default:
      return state;
  }
}