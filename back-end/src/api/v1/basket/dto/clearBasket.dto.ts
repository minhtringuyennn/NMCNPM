import { IsString, IsNotEmpty } from 'class-validator';

export default class ClearBasketDto {
  @IsNotEmpty()
  @IsString()
  userID: string;
}
