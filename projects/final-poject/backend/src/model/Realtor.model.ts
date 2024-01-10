import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import User from './User.model';
import Photo from './Photo.model';
import Listing from './Listing.model';

@Entity('Realtor')
class Realtor extends User {
  @OneToOne(() => Photo, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  photo: Photo;

  @OneToMany(() => Listing, (listing) => listing.realtor)
  listings: Listing[];

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column({ default: 0 })
  rating: number;
}

export default Realtor;
