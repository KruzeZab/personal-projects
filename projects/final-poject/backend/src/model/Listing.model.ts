import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import Photo from './Photo.model';
import BaseModel from './BaseModel';
import Realtor from './Realtor.model';
import { States } from '../interface/listing';

@Entity('Listing')
class Listing extends BaseModel {
  @OneToMany(() => Photo, (photo) => photo.listing)
  photos: Photo[];

  @ManyToOne(() => Realtor, (realtor: Realtor) => realtor.listings, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn()
  realtor: Realtor;

  @Index()
  @Column()
  title: string;

  @Column()
  address: string;

  @Index()
  @Column()
  city: string;

  @Index()
  @Column({ type: 'enum', enum: States, default: States.PROVINCE_1 })
  state: States;

  @Column()
  zicpode: string;

  @Column()
  description: string;

  @Index()
  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'int' })
  bedrooms: number;

  @Column({ type: 'int' })
  bathrooms: number;

  @Column({ type: 'int' })
  garage: number;

  @Column({ type: 'int' })
  sqft: number;

  @Column({ type: 'float' })
  lot_size: number;
}

export default Listing;
