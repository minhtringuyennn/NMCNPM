import { MODELS } from '@common/constants';
import ITimesStamp from '@common/interfaces/timestamp.interface';
import toJSON from '@utils/toJSON.plugin';
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import mongoose, { Schema, Types } from 'mongoose';

enum Size {
  Small = 'S',
  Medium = 'M',
  Large = 'L',
}

class BasketItem {
  @IsString()
  @IsNotEmpty()
  item: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsIn(['S', 'M', 'L'])
  size: string;

  topping: string;

  @IsNumber()
  @IsPositive()
  price: number;
}

export class IBasket extends ITimesStamp {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  items: BasketItem[];

  @IsNumber()
  @IsPositive()
  totalPrice: number;
}

export interface IBasketSchema extends Document, IBasket {}

const basketSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: [
      {
        item: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, 'quantity of product must greater or equal to zero'],
        },
        size: {
          type: String,
          enum: ['S', 'M', 'L'],
        },
        topping: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    totalPrice: {
      type: Number,
      min: [0, 'Price must be a positive number'],
    },
  },
  {
    timestamps: true,
  },
);

basketSchema.plugin(toJSON);

export default mongoose.model<IBasketSchema>(MODELS.BASKETS, basketSchema);
