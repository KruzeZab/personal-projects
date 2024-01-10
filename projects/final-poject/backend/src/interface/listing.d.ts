import { States } from '../model/Listing.model';
import { PaginationQuery } from './pagination';

export interface IListing {
  title: string;
  photos: string[];
  realtorId: number;
  title: string;
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
  title: string[];
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
