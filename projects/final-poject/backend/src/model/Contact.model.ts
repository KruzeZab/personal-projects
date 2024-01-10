import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import BaseModel from './BaseModel';
import Realtor from './Realtor.model';
import User from './User.model';

@Entity('Contact')
class Contact extends BaseModel {
  @Column()
  message: string;

  @OneToOne(() => Realtor, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  realtor: Realtor;

  @OneToOne(() => User, { cascade: true, eager: true, nullable: false })
  @JoinColumn()
  user: User;
}

export default Contact;
