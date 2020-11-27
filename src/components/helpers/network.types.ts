import { PaymentMethod } from "../../store/state";

interface Donor {
    name: string;
    email: string;
    ssn?: string;
    newsletter: boolean;
}

export interface OrganizationSplit {
    id: number;
    split: number;
    name: string;
}

export interface DonationData {
    donor: Donor;
    amount?: number;
    method: string;
    organizations?: Array<OrganizationSplit>
}

export interface ReferralData {
    referralTypeID: number;
    donorID: number;
    otherComment: string;
}
