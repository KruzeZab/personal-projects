import { ISignup, ISignupErrors } from './auth';
import { PaginationQuery } from './pagination';

export interface IRealtorSignup extends ISignup {
  photo: string;
  phone: string;
  website: string;
  rating: number;
}

export interface IRealtorSignupErrors extends ISignupErrors {
  website: string[];
  phone: string[];
  photo: string[];
  rating: string[];
}

export interface GetAllRealtorsQuery extends PaginationQuery {}

export interface GetSearchRealtorsQuery extends PaginationQuery {
  username: string;
}
