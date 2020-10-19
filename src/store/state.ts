export interface WidgetState {
    donation: Donation,
    layout: Layout,
    paypal: PayPalState,
    error: Error,
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
    sum?: number,
    recurring: boolean,
    donor?: Donor,
    shares?: Array<Share>,
}

export interface Donation extends DonationInput {
    kid?: number
}

export interface Donor {
    name?: string,
    email?: string,
    taxDeduction?: boolean,
    ssn?: number,
    newsletter: boolean,
    donorID?: number,
}

export interface Share {
    orgID: string,
    share: number,
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
