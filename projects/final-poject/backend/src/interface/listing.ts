import { PaginationQuery } from './pagination';

export interface IListing {
  title: string;
  photos: string[];
  realtorId: number;
  address: string;
  city: string;
  state: States;
  zicpode: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  sqft: number;
  lot_size: number;
}

export interface IListingErrors {
  title: string[];
  photos: string[];
  realtorId: string[];
  address: string[];
  city: string[];
  state: string[];
  zicpode: string[];
  description: string[];
  price: string[];
  bedrooms: string[];
  bathrooms: string[];
  garage: string[];
  sqft: string[];
  lot_size: string[];
}

export interface GetAllListingQuery extends PaginationQuery {}

export interface GetSearchListingQuery extends PaginationQuery {
  title: string;
  city: string;
  state: States;
}

export enum States {
  PROVINCE_1 = 'province_1',
  PROVINCE_2 = 'province_2',
  BAGMATI = 'bagmati',
  GANDAKI = 'gandaki',
  PROVINCE_5 = 'province_5',
  KARNALI = 'karnali',
  SUDUR_PASCHIM = 'sudur_paschim',
}
