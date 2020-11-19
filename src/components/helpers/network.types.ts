interface Donor {
    name: string;
    email: string;
    ssn: string;
    newsletter: boolean;
}

interface Organization {
    id: number;
    split: number;
    name: string;
}

export interface DonationData {
    donor: Donor;
    amount: number;
    organizations?: Array<Organization>
}

export interface ReferralData {
    referralTypeID: number;
    donorID: number;
    otherComment: string;
}
