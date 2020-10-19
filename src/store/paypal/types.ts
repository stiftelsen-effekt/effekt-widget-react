export const SET_PAYPAL_LOADING = 'SET_PAYPAL_LOADING'
export const SET_PAYPAL_SUCCESS = 'SET_PAYPAL_SUCCESS'

interface SetPayPalLoading {
  type: typeof SET_PAYPAL_LOADING
  payload: {
    isLoading: boolean
  }
}

interface SetPaypalSuccess {
  type: typeof SET_PAYPAL_SUCCESS
  payload: {
    isSuccess: boolean
  }
}

export type PayPalActionTypes = SetPayPalLoading | SetPaypalSuccess