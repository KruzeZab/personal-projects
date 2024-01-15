import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import BaseModel from './BaseModel';
import Realtor from './Realtor.model';

@Entity('Listing')
class Listing extends BaseModel {
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

  @Column({ default: '' })
  address: string;

  @Index()
  @Column()
  city: string;

  @Index()
  @Column({ default: 'province_1' })
  state: string;

  @Column()
  zipcode: string;

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

  @Column({ default: '' })
  photo_1: string;

  @Column({ default: '' })
  photo_2: string;

  @Column({ default: '' })
  photo_3: string;

  @Column({ default: '' })
  photo_4: string;

  @Column({ default: '' })
  photo_5: string;

  @Column({ default: '' })
  photo_6: string;

  @Column({ default: '' })
  photo_7: string;
}

export default Listing;
