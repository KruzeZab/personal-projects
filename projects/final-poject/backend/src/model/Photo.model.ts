import { Column, Entity, ManyToOne } from 'typeorm';
import BaseModel from './BaseModel';
import Listing from './Listing.model';

@Entity('Photo')
class Photo extends BaseModel {
  @Column()
  src: string;

  @Column()
  alt: string;

  @ManyToOne(() => Listing, (listing: Listing) => listing.photos)
  listing: Listing;
}

export default Photo;
