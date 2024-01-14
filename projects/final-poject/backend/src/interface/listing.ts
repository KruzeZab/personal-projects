import { PaginationQuery } from './pagination';

export interface IListing {
  title: string;
  photos: string[];
  realtorId: number;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  sqft: number;
  lot_size: number;
}

export interface IListingErrors {
  title: string;
  photo_main: string;
  photo_1: string;
  photo_2: string;
  photo_3: string;
  photo_4: string;
  photo_5: string;
  photo_6: string;
  realtorId: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  description: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  garage: string;
  sqft: string;
  lot_size: string;
}

export interface GetAllListingQuery extends PaginationQuery {}

export interface GetSearchListingQuery extends PaginationQuery {
  title: string;
  city: string;
  state: string;
}
