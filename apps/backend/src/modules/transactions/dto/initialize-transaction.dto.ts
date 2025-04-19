import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InitializeTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  listingId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
