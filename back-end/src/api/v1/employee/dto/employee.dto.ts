import { IsString, IsNotEmpty, MaxLength, Matches, IsNumber, IsPositive } from 'class-validator';

export class EmployeeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  employeeName: string;

  @IsString()
  @Matches(/^\d{10}$/, { message: 'phoneNumber must be exactly 10 digits' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  role: string;

  @IsNumber()
  @IsPositive()
  salary: number;
}
