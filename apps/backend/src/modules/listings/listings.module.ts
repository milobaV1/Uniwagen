import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [ListingsController],
  providers: [ListingsService],
  imports: [TypeOrmModule.forFeature([Listing, User]), UsersModule],
})
export class ListingsModule {}
