export enum DonorType {
  ANONYMOUS,
  DONOR,
}

export interface Shares {
  [key: string]: number;
}

export interface IServerResponse<T> {
  status: number;
  content: T | string;
}

export interface OrganizationShare {
  id: number;
  share: number;
  name: string;
}

export interface ReferralData {
  referralTypeID: number;
  donorID: number;
  otherComment: string;
}
