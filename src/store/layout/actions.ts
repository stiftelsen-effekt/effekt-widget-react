import { LayoutActionTypes, SELECT_CUSTOM_SHARE, SELECT_PRIVACY_POLICY, EDIT_PANE_NUMBER } from './types';

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

export function editPaneNumber(paneNumber: number): LayoutActionTypes {
  return {
    type: EDIT_PANE_NUMBER,
    payload: {
        paneNumber
    },
  };
}
