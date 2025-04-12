/* eslint-disable prettier/prettier */
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Category {
  CLOTHING = 'clothing',
  BOOKS = 'books',
}

export enum ListingStatus {
  ACTIVE = 'active',
  SOLD = 'sold',
}

@Entity()
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  price: number;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column({ type: 'text', array: true, nullable: true })
  imageUrl: string[];

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ nullable: true })
  contactPhone: string;

  @Column({ type: 'enum', enum: ListingStatus, default: ListingStatus.ACTIVE })
  isSold: ListingStatus;

  @ManyToOne(() => User, (user) => user.listings, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
