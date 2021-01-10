interface Donor {
  name: string;
  email: string;
  ssn?: string;
  newsletter: boolean;
}

export interface OrganizationShare {
  id: number;
  share: number;
  name: string;
}

export interface DonationData {
  donor: Donor;
  amount?: number;
  method: string;
  organizations?: Array<OrganizationShare>;
}

export interface ReferralData {
  referralTypeID: number;
  donorID: number;
  otherComment: string;
}

export interface PostDonationResponse {
  content: {
    KID: number;
    donorID: number;
    hasAnsweredReferral: boolean;
    paymentProviderUrl: string;
  };
  status: number;
}
