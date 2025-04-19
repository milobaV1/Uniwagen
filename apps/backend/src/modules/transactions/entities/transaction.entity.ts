import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum PaymentStatus {
  PAID = 'paid',
  PENDING = 'pending',
  NOTPAID = 'notpaid',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  transactionReference: string;

  @Column()
  paymentLink: string;

  @Column({ nullable: true })
  transactionStatus: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.NOTPAID,
  })
  status: PaymentStatus;

  @Column()
  listingId: string;
}
