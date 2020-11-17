import { PaymentMethod, Shares } from '../state'

export const SELECT_PAYMENT_METHOD = 'SELECT_PAYMENT_METHOD'
export const SELECT_TAX_DEDUCTION = 'SELECT_TAX_DEDUCTION'
export const SUBMIT_DONOR_INFO = 'SUBMIT_DONOR_INFO'
export const SET_SHARES = 'SET_SHARES'
export const SET_SUM = 'SET_SUM'
export const SET_RECURRING = 'SET_RECURRING'

interface SelectPaymentMethod {
  type: typeof SELECT_PAYMENT_METHOD
  payload: {
    method: PaymentMethod
  }
}

interface SelectTaxDeduction {
  type: typeof SELECT_TAX_DEDUCTION
  payload: {
    taxDeduction: boolean
  }
}

interface SubmitDonorInfo {
    type: typeof SUBMIT_DONOR_INFO
    payload: {
        name: string,
        email: string,
        taxDeduction: boolean,
        ssn: number,
        newsletter: boolean,
    }
}

interface SetShares {
  type: typeof SET_SHARES
  payload: {
    shares: Shares
  }
}

interface SetSum {
  type: typeof SET_SUM
  payload: {
    sum: number,
  }
}

interface SetRecurring {
  type: typeof SET_RECURRING
  payload: {
    recurring: boolean,
  }
}

export type DonationActionTypes = SelectPaymentMethod | SelectTaxDeduction | SubmitDonorInfo | SetShares | SetSum | SetRecurring
