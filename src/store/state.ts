import { FormStateMap } from 'redux-form'

export interface State {
    donation: Donation,
    layout: Layout,
    paypal: PayPalState,
    error: Error,
    form: FormStateMap,
}

export interface Layout {
    privacyPolicy: boolean,
    customShare: boolean,
    paneNumber: number,
}

export interface PayPalState {
    loading: boolean,
    success: boolean,
}

export interface DonationInput {
    method?: PaymentMethod,
    sum: number,
    recurring: boolean,
    donor?: Donor,
    shares?: Shares,
}

export interface Donation extends DonationInput {
    kid?: number
}

export interface DonorInput {
    name?: string,
    email?: string,
    taxDeduction?: boolean,
    ssn?: number,
    newsletter: boolean,
}

export interface Donor extends DonorInput {
    donorID?: number
}

export interface Share {
    organizationID: number,
    share: number,
}

export interface Shares {
    [key: string]: number
}

export interface Error {
    isVisible: boolean,
    message: string,
}

export enum PaymentMethod {
    BANK = 2,
    PAYPAL = 3,
    VIPPS_KID = 4,
    BANK_UKID = 5,
    VIPPS = 6,
}
