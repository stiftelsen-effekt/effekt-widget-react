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
