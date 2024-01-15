import { IListingsProps } from './listing';
import { IRealtors } from './realtor';

export interface IPageMeta {
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

export interface ILoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}
