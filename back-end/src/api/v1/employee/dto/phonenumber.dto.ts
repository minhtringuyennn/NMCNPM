import { IsString, Matches } from 'class-validator';

export class PhoneNumberDto {
  @IsString()
  @Matches(/^\d{10}$/, { message: 'phoneNumber must be exactly 10 digits' })
  phoneNumber: string;
}
