import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export default class SearchDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  productName: string;
}
