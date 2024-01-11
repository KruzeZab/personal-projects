import { PaginationQuery } from './pagination';

export interface IContact {
  message: string;
  userId: number;
  realtorId: number;
}

export interface IContactErrors {
  message: string[];
  userId: string[];
  realtorId: string[];
}

export interface GetAllContactQuery extends PaginationQuery {}
