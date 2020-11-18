export const SELECT_CUSTOM_SHARE = 'SELECT_CUSTOM_SHARE'
export const SELECT_PRIVACY_POLICY = 'SELECT_PRIVACY_POLICY'
export const SET_PANE_NUMBER = 'SET_PANE_NUMBER'

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

export type LayoutActionTypes = SelectCustomShare | SelectPrivacyPolicy | setPaneNumber
