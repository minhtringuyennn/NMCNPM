import { IsNotEmpty, IsNumber, IsPositive, IsString, Matches } from 'class-validator';

export class PromotionDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_-]+?\.(jpg|jpeg|png)$/, {
    message: 'file must have jpg, jepg or png extension',
  })
  imageLink: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  discount: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(VND|%|([01]?[0-9]|2[0-3]):([0-5]?[0-9])\s([01]?[0-9]|2[0-3]):([0-5]?[0-9]))$/, {
    message: 'discount type must be either "VND", "%", or "Hour:minute hour:minute" format',
  })
  discountType: string;
}
