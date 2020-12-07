export const SELECT_CUSTOM_SHARE = 'SELECT_CUSTOM_SHARE'
export const SELECT_PRIVACY_POLICY = 'SELECT_PRIVACY_POLICY'
export const SET_PANE_NUMBER = 'SET_PANE_NUMBER'
export const INCREMENT_CURRENT_PANE = 'INCREMENT_CURRENT_PANE'
export const DECREMENT_CURRENT_PANE = 'DECREMENT_CURRENT_PANE'
export const SET_ANSWERED_REFERRAL = 'SET_ANSWERRED_REFERRAL'
export const SET_HEIGHT = 'SET_HEIGHT'

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

interface incrementCurrentPane {
    type: typeof INCREMENT_CURRENT_PANE
}

interface decrementCurrentPane {
    type: typeof DECREMENT_CURRENT_PANE
}

interface setAnsweredReferral {
    type: typeof SET_ANSWERED_REFERRAL
    payload: {
        answeredReferral: boolean
    }
}

interface setHeight {
    type: typeof SET_HEIGHT,
    payload: {
        height: number
    }
}

export type LayoutActionTypes = SelectCustomShare | SelectPrivacyPolicy | setPaneNumber | incrementCurrentPane | decrementCurrentPane | setAnsweredReferral | setHeight
