/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/modules/users/entities/user.entity';
import { Listing } from 'src/modules/listings/entities/listing.entity';
import { Request } from 'src/modules/requests/entities/request.entity';
// import { Listing } from 'src/modules/listings/listing.entity';

export const typeOrmConfigAsync = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [User, Listing, Request],
    synchronize: true, // disable in production
    autoLoadEntities: true,
  }),
};
