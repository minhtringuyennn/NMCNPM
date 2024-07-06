import { IsString, IsNumber, IsPositive, IsIn, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export default class ItemDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  item: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsIn(['S', 'M', 'L'])
  size: string;

  @IsString()
  topping: string;
}
