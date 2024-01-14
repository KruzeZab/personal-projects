import { ISignup } from './auth';
import { PaginationQuery } from './pagination';

export interface IRealtorSignup extends ISignup {
  photo: string;
  phone: string;
  website: string;
  rating: number;
}

export interface GetAllRealtorsQuery extends PaginationQuery {}

export interface GetSearchRealtorsQuery extends PaginationQuery {
  username: string;
}
