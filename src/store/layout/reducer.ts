import { Reducer } from 'redux';
import { Layout } from '../state';
import { SET_PANE_NUMBER, LayoutActionTypes, SELECT_CUSTOM_SHARE, SELECT_PRIVACY_POLICY } from './types';

const initialState: Layout = {
    privacyPolicy: false,
    customShare: false,
    paneNumber: 0,
}

/**
 * The reducer is a pure function that takes in the previous state,
 * performs an action on that state and returns the new updated state.
 *
 * @param {Layout} state The current state of the Layout
 * @param {LayoutActionTypes} action An action mutating the current Layout state
 */

export const layoutReducer: Reducer<Layout, LayoutActionTypes> = (
  state: Layout = initialState,
  action: LayoutActionTypes,
) => {
  switch (action.type) {
    case SELECT_CUSTOM_SHARE:
      return { ...state, customShare: action.payload.customShare }
    case SELECT_PRIVACY_POLICY:
      return { ...state, privacyPolicy: action.payload.privacyPolicy }
    case SET_PANE_NUMBER:
      return { ...state, paneNumber: action.payload.paneNumber}
    default:
      return state;
  }
}