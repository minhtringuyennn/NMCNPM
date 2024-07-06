import { MODELS } from '@common/constants';
import ITimesStamp from '@common/interfaces/timestamp.interface';
import toJSON from '@utils/toJSON.plugin';
import { IsNotEmpty, IsNumber, IsPositive, IsString, Matches } from 'class-validator';
import mongoose, { Schema } from 'mongoose';

export class IPromotion extends ITimesStamp {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsPositive()
  discount: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(VND|%|([01]?[0-9]|2[0-3]):([0-5]?[0-9])\s([01]?[0-9]|2[0-3]):([0-5]?[0-9]))$/, {
    message: 'discount type must be either "VND", "%", or "Hour:minute hour:minute" format',
  })
  discountType: string;
}

export interface IPromotionSchema extends Document, IPromotion {}

const promotionSchema = new Schema({
  code: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  discountType: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v: string) {
        return /^(VND|%|([01]?[0-9]|2[0-3]):([0-5]?[0-9])\s([01]?[0-9]|2[0-3]):([0-5]?[0-9]))$/.test(v);
      },
      message: props => `${props.value} discount type must be either "VND", "%", and "hour:minute hour:minute" format`,
    },
  },
});

promotionSchema.plugin(toJSON);

export default mongoose.model<IPromotionSchema>(MODELS.PROMOTIONS, promotionSchema);
