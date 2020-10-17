import { DonationActionTypes, SELECT_PAYMENT_METHOD, SELECT_TAX_DEDUCTION } from './types';
import {PaymentMethod } from '../state'

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
