import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../entities/listing.entity';

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(Category)
  category: Category;

  //images
  @IsString({ each: true })
  @IsOptional()
  imageUrl: string[];

  @IsString()
  @IsOptional()
  contactEmail: string;

  @IsString()
  @IsOptional()
  contactPhone: string;
}
