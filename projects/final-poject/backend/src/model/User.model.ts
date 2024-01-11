import { Column, Entity } from 'typeorm';
import BaseModel from './BaseModel';
import { Roles } from '../interface/auth';

@Entity('User')
class User extends BaseModel {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
}

export default User;
