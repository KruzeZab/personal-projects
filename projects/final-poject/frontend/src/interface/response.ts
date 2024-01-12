import { IListingsProps } from './listing';
import { IRealtors } from './realtor';

interface IPageMeta {
  page: number;
  size: number;
  total: number;
}

export interface IListingsResponse {
  data: IListingsProps[];
  meta: IPageMeta;
}

export interface IRealtorsResponse {
  data: IRealtors[];
  meta: IPageMeta;
}
