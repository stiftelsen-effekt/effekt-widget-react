import { PayPalActionTypes, SET_PAYPAL_LOADING, SET_PAYPAL_SUCCESS } from './types';

export function setPayPalLoading(isLoading: boolean): PayPalActionTypes {
  return {
    type: SET_PAYPAL_LOADING,
    payload: {
        isLoading
    },
  };
}

export function setPayPalSuccess(isSuccess: boolean): PayPalActionTypes {
  return {
    type: SET_PAYPAL_SUCCESS,
    payload: {
        isSuccess
    }
  };
}