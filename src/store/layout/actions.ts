import { LayoutActionTypes, SELECT_CUSTOM_SHARE, SELECT_PRIVACY_POLICY, SET_ANSWERED_REFERRAL, SET_PANE_NUMBER } from './types';

export function selectCustomShare(customShare: boolean): LayoutActionTypes {
  return {
    type: SELECT_CUSTOM_SHARE,
    payload: {
        customShare
    },
  };
}

export function selectPrivacyPolicy(privacyPolicy: boolean): LayoutActionTypes {
  return {
    type: SELECT_PRIVACY_POLICY,
    payload: {
        privacyPolicy
    },
  };
}

export function setPaneNumber(paneNumber: number): LayoutActionTypes {
  return {
    type: SET_PANE_NUMBER,
    payload: {
        paneNumber
    },
  };
}

export function setAnsweredReferral(answeredReferral: boolean) {
  return {
    type: SET_ANSWERED_REFERRAL,
    payload: {
      answeredReferral
    }
  }
}
