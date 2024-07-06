import { IsNumber, IsPositive, IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export default class ProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  productName: string;

  @IsNumber()
  @IsPositive()
  basePrice: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  category: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stock?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsNumber()
  @IsPositive()
  cost: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  upscaleFee?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  sizeS?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  sizeM?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  sizeL?: number;
}
