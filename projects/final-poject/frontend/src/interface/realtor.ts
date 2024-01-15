import { Photo } from './photo';
import { IPageMeta } from './response';

export interface IRealtors {
  id: number;
  phone: string;
  website: string;
  email: string;
  photo: Photo;
  username: string;
}

export interface IQuery {
  username: string;
  page: number;
}

export interface IRealtorPagination extends IQuery, IPageMeta {}
