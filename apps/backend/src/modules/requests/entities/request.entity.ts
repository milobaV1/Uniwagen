import { User } from 'src/modules/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'int', nullable: true })
  budget: number;

  @ManyToOne(() => User, (user) => user.requests, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
