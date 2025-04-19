import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TransactionStatus {
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

  @Column()
  transactionStatus: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.NOTPAID,
  })
  status: TransactionStatus;

  @Column()
  listingId: string;
}
