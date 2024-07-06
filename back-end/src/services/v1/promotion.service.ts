import { ObjectId } from 'mongoose';
import { BadRequestError, NotFoundError } from 'routing-controllers';

import OwnerPromotions, { IOwnerPromationSchema } from '@models/ownerPromotions.model';
import Promotions from '@models/promotion.model';

import { PromotionDto } from '@v1/promotion/dto/promotion.dto';
import CRUD from '@common/interfaces/crud.interface';

import { REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET } from '../../config';
import AWS from 'aws-sdk';

export class PromotionService implements CRUD<IOwnerPromationSchema> {
  private readonly promotionModel = OwnerPromotions;

  checkPromotionDuration(promotionTime: string): boolean {
    const times = promotionTime.split(' ');
    const hours = [];
    const minutes = [];
    let result = true;

    for (const time of times) {
      const item = time.split(':');
      hours.push(item[0]);
      minutes.push(item[1]);
    }

    if (hours[0] > hours[1]) {
      result = false;
    } else if (hours[0] === hours[1]) {
      if (minutes[0] > minutes[1]) {
        result = false;
      }
    }

    return result;
  }

  combineOwnerPromotionAndPromotion(promotion: any, ownerPromotion: any) {
    const result = {
      thumbnail: ownerPromotion.thumbnail,
      description: ownerPromotion.description,
      promotion: {
        code: promotion.code,
        discount: promotion.discount,
        discountType: promotion.discountType,
      },
    };

    return result;
  }

  seperateHourAndMinute(hourRange: string) {
    const times = hourRange.split(' ');
    const hours = [];
    const minutes = [];

    for (const time of times) {
      const hourAndMinute = time.split(':');
      hours.push(hourAndMinute[0]);
      minutes.push(hourAndMinute[1]);
    }

    return [Number(hours[0]), Number(minutes[0]), Number(hours[1]), Number(minutes[1])];
  }

  isHourRangeInPromotionTime(promotionTime, hourRange) {
    const preprocessedPromotionTime = this.seperateHourAndMinute(promotionTime);
    const preprocessedHourRange = this.seperateHourAndMinute(hourRange);

    const isStartTimeAfter =
      preprocessedPromotionTime[0] > preprocessedHourRange[0] ||
      (preprocessedHourRange[0] === preprocessedPromotionTime[0] && preprocessedPromotionTime[1] > preprocessedHourRange[1]);

    const isEndTimeBefore =
      preprocessedPromotionTime[2] < preprocessedHourRange[2] ||
      (preprocessedPromotionTime[2] === preprocessedHourRange[2] && preprocessedPromotionTime[3] < preprocessedHourRange[3]);

    return isStartTimeAfter && isEndTimeBefore;
  }

  async findAll(limit = 10, page = 0) {
    const query = {};
    const totalDocs = await this.promotionModel.countDocuments(query);
    const docs = await this.promotionModel
      .find(query)
      .limit(limit)
      .skip(limit * page)
      .sort({ createdAt: -1 })
      .lean();

    const result = [];

    for (const doc of docs) {
      const promotion = await Promotions.findOne({ _id: doc.promotionId }).lean();
      const item = this.combineOwnerPromotionAndPromotion(promotion, doc);
      result.push(item);
    }

    return {
      docs: result,
      meta: {
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit) || 0,
        page,
      },
    };
  }

  async getById(id: ObjectId): Promise<IOwnerPromationSchema | null> {
    return await this.promotionModel.findById(id);
  }

  async createPromotion(promotionData: PromotionDto) {
    const { code, discount, discountType } = promotionData;
    const promotion = await Promotions.find({ code: code }).exec();

    if (promotion.length !== 0) {
      throw new BadRequestError('This code already exist');
    }

    if (discountType.length > 3) {
      if (!this.checkPromotionDuration(discountType)) {
        throw new BadRequestError('Error in checking time for promotion');
      }
    }

    if (discountType === '%') {
      const isInValidDiscount = discount < 0 || discount > 100;

      if (isInValidDiscount) {
        throw new BadRequestError('Invalid discount value with percent type');
      }
    }

    try {
      const s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: 'ap-southeast-1',
      });

      const params = {
        Bucket: BUCKET,
        Key: promotionData.imageLink,
        Expires: 60,
      };

      const singedUrl = await s3.getSignedUrlPromise('putObject', params);
      promotionData.imageLink = singedUrl;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }

    const newPromotion = await Promotions.create({
      code: code,
      discount: discount,
      discountType: discountType,
    });

    const newOwnerPromotion = await this.promotionModel.create({
      thumbnail: promotionData.imageLink.split('?')[0],
      description: promotionData.description,
      promotionId: newPromotion._id,
    });

    const result = this.combineOwnerPromotionAndPromotion(newPromotion, newOwnerPromotion);
    result.thumbnail = promotionData.imageLink;

    return result;
  }

  async getPromotionByTime(starttime: string, endtime: string) {
    const hourRange = starttime + ' ' + endtime;
    const isHourRangeValid = /^(VND|%|([01]?[0-9]|2[0-3]):([0-5]?[0-9])\s([01]?[0-9]|2[0-3]):([0-5]?[0-9]))$/.test(hourRange);

    if (isHourRangeValid === false) {
      throw new BadRequestError('Invalid hour range');
    }

    const allPromotions = await Promotions.find({}).exec();
    const isPromotionListEmpty = allPromotions.length === 0;

    if (isPromotionListEmpty) {
      throw new BadRequestError('Promotion list is empty');
    }

    const promotionResult = [];

    for (const promotion of allPromotions) {
      if (promotion.discountType === '%' || promotion.discountType === 'VND') {
        const ownerPromotion = await this.promotionModel.find({ promotionId: promotion._id }).exec();

        if (ownerPromotion.length !== 0) {
          const combinedItem = this.combineOwnerPromotionAndPromotion(promotion, ownerPromotion[0]);
          promotionResult.push(combinedItem);
        }
      } else if (this.isHourRangeInPromotionTime(promotion.discountType, hourRange)) {
        const ownerPromotion = await this.promotionModel.find({ promotionId: promotion._id }).exec();

        if (ownerPromotion.length !== 0) {
          const combinedItem = this.combineOwnerPromotionAndPromotion(promotion, ownerPromotion[0]);
          promotionResult.push(combinedItem);
        }
      }
    }

    return promotionResult;
  }

  async getPromotionByCode(code: string) {
    const promotion = await Promotions.find({ code: code }).exec();

    if (promotion.length === 0) {
      throw new BadRequestError('No promotion with this code');
    }

    const ownerPromotion = await this.promotionModel.find({ promotionId: promotion[0]._id }).exec();

    if (ownerPromotion.length === 0) {
      throw new NotFoundError('This promotion is not available');
    }

    const promotionResult = this.combineOwnerPromotionAndPromotion(promotion[0], ownerPromotion[0]);
    return promotionResult;
  }

  async updatePromotion(promotionData: PromotionDto) {
    const promotion = await Promotions.find({ code: promotionData.code }).exec();
    const isPromotionExist = promotion.length !== 0;

    if (!isPromotionExist) {
      throw new BadRequestError('Promotion not exist');
    }

    const ownerPromotion = await this.promotionModel.find({ promotionId: promotion[0]._id }).exec();
    const isOwnerPromotionExist = ownerPromotion.length !== 0;

    if (!isOwnerPromotionExist) {
      throw new BadRequestError('This promotion is not available');
    }

    try {
      const s3 = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: 'ap-southeast-1',
      });

      const params = {
        Bucket: BUCKET,
        Key: promotionData.imageLink,
        Expires: 60,
      };

      const singedUrl = await s3.getSignedUrlPromise('putObject', params);
      promotionData.imageLink = singedUrl;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }

    const newOwnerPromotionData = {
      thumbnail: promotionData.imageLink.split('?')[0],
      description: promotionData.description,
      promotionId: promotion[0]._id,
    };

    const newPromotionData = {
      code: promotionData.code,
      discount: promotionData.discount,
      discountType: promotionData.discountType,
    };

    Object.assign(promotion[0], newPromotionData);
    Object.assign(ownerPromotion[0], newOwnerPromotionData);

    await promotion[0].save();
    await ownerPromotion[0].save();

    newOwnerPromotionData.thumbnail = promotionData.imageLink;

    const result = this.combineOwnerPromotionAndPromotion(newPromotionData, newOwnerPromotionData);

    return result;
  }

  async deletePromotion(code: string) {
    const promotion = await Promotions.find({ code: code }).exec();
    const isPromotionExist = promotion.length !== 0;

    if (!isPromotionExist) {
      throw new BadRequestError('Promotion not exist');
    }

    const ownerPromotion = await this.promotionModel.find({ promotionId: promotion[0]._id }).exec();
    const isOwnerPromotionExist = ownerPromotion.length !== 0;

    if (!isOwnerPromotionExist) {
      throw new BadRequestError('This promotion not availabel');
    }

    await this.promotionModel.findByIdAndDelete(ownerPromotion[0]._id);
    await Promotions.findByIdAndDelete(promotion[0]._id);

    return { message: 'Promotion successfully deleted' };
  }
}
