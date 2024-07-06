import { IsEmail, IsIn, IsNotEmpty, IsOptional, MinLength, IsDateString, IsPhoneNumber } from 'class-validator';

export default class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  @IsIn(['male', 'female', 'other'])
  gender: Gender;

  @IsNotEmpty()
  fullName: string;

  @IsOptional()
  @IsIn(['user', 'owner', 'employee'])
  role?: Role;
}

type Role = 'user' | 'owner' | 'employee';
type Gender = 'male' | 'female' | 'other';
