import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class EmployeeNameDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  employeeName: string;
}
