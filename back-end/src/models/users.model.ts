import bcrypt from 'bcrypt';
import { IsEmail, IsEnum, IsString, IsDateString, IsPhoneNumber } from 'class-validator';
import mongoose, { Document, Schema } from 'mongoose';

import { MODELS } from '@common/constants';
import ITimesStamp from '@common/interfaces/timestamp.interface';
import toJSON from '@utils/toJSON.plugin';

export class IUser extends ITimesStamp {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['user', 'owner', 'employee'])
  role: string;

  @IsDateString()
  dob: string;

  @IsPhoneNumber(null)
  phoneNumber: string;

  @IsEnum(['male', 'female', 'other'])
  gender: string;

  @IsString()
  fullName: string;
}

export interface IUserSchema extends Document, IUser {}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
      private: true,
    },
    role: {
      type: String,
      enum: ['user', 'owner', 'employee'],
      default: 'user',
    },
    dob: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this as IUserSchema;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.plugin(toJSON);

export default mongoose.model<IUserSchema>(MODELS.USERS, userSchema);
