import { IRealtors } from './realtor';
import { IPageMeta } from './response';

export interface IListingsProps {
  id: number;
  lot_size: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  garage: number;
  title: string;
  photo_1: string;
  photo_2: string;
  photo_3: string;
  photo_4: string;
  photo_5: string;
  photo_6: string;
  photo_7: string;
  city: string;
  zipcode: string;
  created_at: string;
  realtor: IRealtors;
  state: string;
  description: string;
}

export interface IQuery {
  title: string;
  city: string;
  state: string;
  page: number;
}

export interface IListingPagination extends IQuery, IPageMeta {}
