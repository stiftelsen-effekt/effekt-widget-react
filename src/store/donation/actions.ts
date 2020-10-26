import { DonationActionTypes, SELECT_PAYMENT_METHOD, SELECT_TAX_DEDUCTION, SUBMIT_DONOR_INFO, SET_CUSTOM_SHARE, SET_SUM, SET_RECURRING } from './types';
import { PaymentMethod } from '../state'

export function selectPaymentMethod(method: PaymentMethod): DonationActionTypes {
  return {
    type: SELECT_PAYMENT_METHOD,
    payload: {
        method
    },
  };
}

export function selectTaxDeduction(taxDeduction: boolean): DonationActionTypes {
  return {
    type: SELECT_TAX_DEDUCTION,
    payload: {
        taxDeduction
    }
  };
}

export function submitDonorInfo() {

}

export function setCustomShare() {

}

export function setSum(sum: number): DonationActionTypes {
  return {
    type: SET_SUM,
    payload: {
      sum
    }
  }
}

export function setRecurring(recurring: boolean): DonationActionTypes {
  return {
    type: SET_RECURRING,
    payload: {
      recurring
    }
  }
}