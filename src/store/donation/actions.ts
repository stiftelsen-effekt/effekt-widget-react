import { DonationActionTypes, SELECT_PAYMENT_METHOD, SELECT_TAX_DEDUCTION, SUBMIT_DONOR_INFO, SET_SUM, SET_RECURRING, SET_SHARES } from './types';
import { PaymentMethod, Share } from '../state'

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

export function submitDonorInfo(name: string, email: string, taxDeduction: boolean, ssn: number, newsletter: boolean): DonationActionTypes {
  return {
    type: SUBMIT_DONOR_INFO,
    payload: {
      name,
      email,
      taxDeduction,
      ssn,
      newsletter
    }
  }
}

export function setShares(shares: Array<Share>) {
  return {
    type: SET_SHARES,
    payload: {
      shares
    }
  }
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