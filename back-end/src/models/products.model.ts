import { IsNumber, IsPositive, IsString } from 'class-validator';
import mongoose, { Document, Schema } from 'mongoose';

import { MODELS } from '@common/constants';
import ITimesStamp from '@common/interfaces/timestamp.interface';
import toJSON from '@utils/toJSON.plugin';

export class IProduct extends ITimesStamp {
  @IsString()
  productName: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  category: string;
}

export interface IProductSchema extends Document, IProduct {}

const productSchema: Schema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      maxLength: 20,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      maxlength: 15,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.plugin(toJSON);

export default mongoose.model<IProductSchema>(MODELS.PRODUCTS, productSchema);
