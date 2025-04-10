import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class CreateRequestDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  budget?: number;
}
