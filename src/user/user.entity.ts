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

  async comparePassword(attempt: string) {

//     const data = await bcrypt.hash(this.attempt, 10);
 return await bcrypt.compare(this.password, attempt);

//   //   bcrypt.compare(this.password, attempt, function(error, isMatch) {
//   //     if(error) {
//   //      console.log ("User are invalid")
//   //     }
//   // console.log("Logged in successfull....")
      
//   //   });
//   console.log ("this is new password", data);

//   if (this.password === data){
//     return  data;
//   }
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

