import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRO } from './userRO.RO';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 50})
  @IsNotEmpty()
  firstName: string;

  @Column({length: 50})
  @IsNotEmpty()
  lastName: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsNotEmpty()
  phone: number;

  @Column()
  @IsNotEmpty()
  address: String;

  @Column()
  @IsNotEmpty()
  city: string;

  @Column()
  @IsNotEmpty()
  country: string;

  @Column()
  @IsNotEmpty()
  pincode: number;
  attempt: any;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): UserRO {
    const { id, firstName, lastName, email, phone } = this;
    const responseObject: UserRO = {
      id,
      firstName,
      lastName,
      email,
      phone
    };

    return responseObject;
  }
}

