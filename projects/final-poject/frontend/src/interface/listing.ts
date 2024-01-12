import { Photo } from './photo';

export interface IListingsProps {
  imgSrc: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  garage: number;
  title: string;
  photos: Photo[];
}
