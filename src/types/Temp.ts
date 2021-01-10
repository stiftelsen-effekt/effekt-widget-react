export enum DonorType {
  ANONYMOUS,
  DONOR,
}

export interface Splits {
  [key: string]: number;
}

export interface IServerResponse<T> {
  status: number;
  content: T;
}
