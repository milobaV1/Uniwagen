import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Category {
  CLOTHING = 'clothing',
  BOOKS = 'books',
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

  @Column({ type: 'boolean', default: false })
  isSold: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
