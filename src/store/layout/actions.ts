import { ShareType } from "../../types/Enums";
import {
  DECREMENT_CURRENT_PANE,
  INCREMENT_CURRENT_PANE,
  LayoutActionTypes,
  SELECT_CUSTOM_SHARE,
  SELECT_PRIVACY_POLICY,
  SET_ANSWERED_REFERRAL,
  SET_PANE_NUMBER,
  SET_SHARE_TYPE,
} from "./types";

export function selectCustomShare(customShare: boolean): LayoutActionTypes {
  return {
    type: SELECT_CUSTOM_SHARE,
    payload: {
      customShare,
    },
  };
}

export function setShareType(shareType: ShareType): LayoutActionTypes {
  return {
    type: SET_SHARE_TYPE,
    payload: {
      shareType,
    },
  };
}

export function selectPrivacyPolicy(privacyPolicy: boolean): LayoutActionTypes {
  return {
    type: SELECT_PRIVACY_POLICY,
    payload: {
      privacyPolicy,
    },
  };
}

export function setPaneNumber(paneNumber: number): LayoutActionTypes {
  return {
    type: SET_PANE_NUMBER,
    payload: {
      paneNumber,
    },
  };
}

export function nextPane(): LayoutActionTypes {
  return {
    type: INCREMENT_CURRENT_PANE,
  };
}

export function prevPane(): LayoutActionTypes {
  return {
    type: DECREMENT_CURRENT_PANE,
  };
}

export function setAnsweredReferral(
  answeredReferral: boolean
): LayoutActionTypes {
  return {
    type: SET_ANSWERED_REFERRAL,
    payload: {
      answeredReferral,
    },
  };
}
