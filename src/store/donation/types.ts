import { PaymentMethod } from '../state'

export const SELECT_PAYMENT_METHOD = 'SELECT_PAYMENT_METHOD'
export const SELECT_TAX_DEDUCTION = 'SELECT_TAX_DEDUCTION'
export const SUBMIT_DONOR_INFO = 'SUBMIT_DONOR_INFO'
export const EDIT_CUSTOM_SHARE = 'EDIT_CUSTOM_SHARE'

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

interface EditCustomShare {
    type: typeof EDIT_CUSTOM_SHARE
    payload: {
        orgID: number,
        share: number,
    }
}

export type DonationActionTypes = SelectPaymentMethod | SelectTaxDeduction | SubmitDonorInfo | EditCustomShare
