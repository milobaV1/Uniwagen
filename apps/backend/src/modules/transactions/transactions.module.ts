import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListingsModule } from '../listings/listings.module';
import { Listing } from '../listings/entities/listing.entity';
import { Transaction } from './entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    TypeOrmModule.forFeature([Transaction, Listing, User]),
    ListingsModule,
    UsersModule,
  ],
})
export class TransactionsModule {}
