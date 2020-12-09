import { RECURRING_DONATION } from "./donation/types"

export interface State {
    donation: Donation
    layout: Layout
    error: Error
}

//TODO: Remove privacyPolicy, it is only needed locally in DonationPane
export interface Layout {
    privacyPolicy: boolean
    customShare: boolean
    paneNumber: number
    answeredReferral?: boolean
    height: number
}

export interface DonationInput {
    method?: PaymentMethod
    sum: number
    recurring: RECURRING_DONATION,
    donor?: Donor
    shares?: Splits
}

export interface Donation extends DonationInput {
    kid?: number
    paymentProviderURL?: string
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

export interface DonorFormValues extends DonorInput {
    privacyPolicy: boolean;
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

export let paymentMethodStrings: any = {}
paymentMethodStrings[PaymentMethod.BANK] = "BANK"
paymentMethodStrings[PaymentMethod.PAYPAL] = "PAYPAL"
paymentMethodStrings[PaymentMethod.VIPPS] = "VIPPS"

export enum PaneNumber {
    MethodPane =  0,
    DonorPane = 1,
    DonationPane = 2,
    SharesPane = 3,
    ReferralPane = 4,
    PayPalPane = 5,
    VippsPane = 6,
    ResultPane = 7
}
