import { FormStateMap } from 'redux-form' //TODO: Remove redux form stuff

export interface State {
    donation: Donation
    layout: Layout
    paypal: PayPalState
    error: Error
    form: FormStateMap
}

//TODO: Remove privacyPolicy, it is only needed locally in DonationPane
export interface Layout {
    privacyPolicy: boolean
    customShare: boolean
    paneNumber: number
    answeredReferral?: boolean
}

export interface PayPalState {
    loading: boolean
    success: boolean
}

export interface DonationInput {
    method?: PaymentMethod
    sum: number
    recurring: boolean
    donor?: Donor
    shares?: Splits
}

export interface Donation extends DonationInput {
    kid?: number
}

export interface DonorInput {
    name?: string
    email?: string
    taxDeduction?: boolean
    ssn?: number
    newsletter?: boolean
}

export interface Donor extends DonorInput {
    donorID?: number
}

export interface Share {
    organizationID: number
    share: number
}

export interface Splits {
    [key: string]: number
}

export interface Error {
    isVisible: boolean
    message: string
}

export enum PaymentMethod {
    BANK = 2,
    PAYPAL = 3,
    VIPPS_KID = 4,
    BANK_UKID = 5,
    VIPPS = 6,
}
