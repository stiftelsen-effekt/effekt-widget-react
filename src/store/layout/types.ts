export const SELECT_CUSTOM_SHARE = 'SELECT_CUSTOM_SHARE'
export const SELECT_PRIVACY_POLICY = 'SELECT_PRIVACY_POLICY'
export const SET_PANE_NUMBER = 'SET_PANE_NUMBER'
export const SET_ANSWERED_REFERRAL = 'SET_ANSWERRED_REFERRAL'

interface SelectCustomShare {
    type: typeof SELECT_CUSTOM_SHARE
    payload: {
        customShare: boolean
    }
}

interface SelectPrivacyPolicy {
    type: typeof SELECT_PRIVACY_POLICY
    payload: {
        privacyPolicy: boolean
    }
}

interface setPaneNumber {
    type: typeof SET_PANE_NUMBER
    payload: {
        paneNumber: number
    }
}

interface setAnsweredReferral {
    type: typeof SET_ANSWERED_REFERRAL
    payload: {
        answeredReferral: boolean
    }
}

export type LayoutActionTypes = SelectCustomShare | SelectPrivacyPolicy | setPaneNumber | setAnsweredReferral
