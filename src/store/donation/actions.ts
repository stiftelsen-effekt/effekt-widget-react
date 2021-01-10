import {
  DonationActionTypes,
  SELECT_PAYMENT_METHOD,
  SELECT_TAX_DEDUCTION,
  SUBMIT_DONOR_INFO,
  SET_SUM,
  SET_RECURRING,
  SET_SHARES,
  SET_DONOR_ID,
  SET_KID,
  SET_PAYMENT_PROVIDER_URL,
} from "./types";
import { PaymentMethod, RecurringDonation } from "../../types/Enums";
import { Shares } from "../../types/Temp";

export function selectPaymentMethod(
  method: PaymentMethod
): DonationActionTypes {
  return {
    type: SELECT_PAYMENT_METHOD,
    payload: {
      method,
    },
  };
}

export function selectTaxDeduction(taxDeduction: boolean): DonationActionTypes {
  return {
    type: SELECT_TAX_DEDUCTION,
    payload: {
      taxDeduction,
    },
  };
}

export function submitDonorInfo(
  name: string,
  email: string,
  taxDeduction: boolean,
  ssn: number,
  newsletter: boolean
): DonationActionTypes {
  return {
    type: SUBMIT_DONOR_INFO,
    payload: {
      name,
      email,
      taxDeduction,
      ssn,
      newsletter,
    },
  };
}

export function setShares(shares: Shares): DonationActionTypes {
  return {
    type: SET_SHARES,
    payload: {
      shares,
    },
  };
}

export function setSum(sum: number): DonationActionTypes {
  return {
    type: SET_SUM,
    payload: {
      sum,
    },
  };
}

export function setRecurring(
  recurring: RecurringDonation
): DonationActionTypes {
  return {
    type: SET_RECURRING,
    payload: {
      recurring,
    },
  };
}

export function setDonorID(donorID: number): DonationActionTypes {
  return {
    type: SET_DONOR_ID,
    payload: {
      donorID,
    },
  };
}

export function setKID(kid: number): DonationActionTypes {
  return {
    type: SET_KID,
    payload: {
      kid,
    },
  };
}

export function setPaymentProviderURL(url: string): DonationActionTypes {
  return {
    type: SET_PAYMENT_PROVIDER_URL,
    payload: {
      url,
    },
  };
}
