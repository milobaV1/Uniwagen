import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../entities/listing.entity';

export class CreateListingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ enum: Category })
  @IsEnum(Category)
  category: Category;

  @ApiPropertyOptional({ type: [String] })
  @IsString({ each: true })
  @IsOptional()
  imageUrl: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactEmail: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  contactPhone: string;

  @ApiProperty()
  @IsString()
  userId: string;
}
