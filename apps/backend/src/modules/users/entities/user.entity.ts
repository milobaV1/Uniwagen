/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Request } from 'src/modules/requests/entities/request.entity';
import { Listing } from 'src/modules/listings/entities/listing.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Request, (request) => request.user)
  requests: Request[];

  @OneToMany(() => Listing, (listing) => listing.user)
  listings: Listing[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.email = this.email.toLowerCase().trim();
    this.firstName = this.firstName.toLowerCase().trim();
    this.lastName = this.lastName.toLowerCase().trim();
    this.password = await bcrypt.hash(this.password.trim(), 10);
  }

  @BeforeUpdate()
  async hashNewPassword() {
    this.email = this.email.toLowerCase().trim();
    this.password = await bcrypt.hash(this.password.trim(), 10);
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt.trim(), this.password);
  }
}
