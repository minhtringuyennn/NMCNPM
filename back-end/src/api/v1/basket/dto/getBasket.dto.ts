import { IsString, IsNotEmpty } from 'class-validator';

export default class GetBasketDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
