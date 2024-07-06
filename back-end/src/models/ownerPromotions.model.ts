import { MODELS } from '@common/constants';
import ITimesStamp from '@common/interfaces/timestamp.interface';
import toJSON from '@utils/toJSON.plugin';
import { IsNotEmpty, IsString } from 'class-validator';
import mongoose, { Schema } from 'mongoose';

export class IOwnerPromation extends ITimesStamp {
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  promotionId: string;
}

export interface IOwnerPromationSchema extends Document, IOwnerPromation {}

const ownerPromotionSchema = new Schema(
  {
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    promotionId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

ownerPromotionSchema.plugin(toJSON);

export default mongoose.model<IOwnerPromationSchema>(MODELS.OWNER_PROMOTIONS, ownerPromotionSchema);
