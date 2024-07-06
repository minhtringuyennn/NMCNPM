import { IsNotEmpty, IsNumber, IsPositive, IsString, Matches, MaxLength } from 'class-validator';
import { MODELS } from '@common/constants';
import ITimesStamp from '@common/interfaces/timestamp.interface';
import mongoose, { Schema } from 'mongoose';
import toJSON from '@utils/toJSON.plugin';

export class IEmployee extends ITimesStamp {
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

export interface IEmployeeSchema extends Document, IEmployee {}

const employeeSchema: Schema = new Schema(
  {
    employeeName: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} must be exactly 10 digits!`,
      },
    },
    role: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

employeeSchema.plugin(toJSON);

export default mongoose.model<IEmployeeSchema>(MODELS.EMPLOYEES, employeeSchema);
