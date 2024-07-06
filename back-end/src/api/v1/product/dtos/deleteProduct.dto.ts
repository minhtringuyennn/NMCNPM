import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export default class DeleteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  productName: string;
}
