import { Column, Entity, OneToMany } from 'typeorm';
import Listing from './Listing.model';
import BaseModel from './BaseModel';

@Entity('Realtor')
class Realtor extends BaseModel {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Listing, (listing) => listing.realtor)
  listings: Listing[];

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column({ default: '' })
  photo: string;
}

export default Realtor;
