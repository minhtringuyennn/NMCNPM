import { validationMiddleware } from '@middlewares/validation.middleware';
import { PromotionService } from '@services/v1/promotion.service';
import { Body, Get, JsonController, Param, Post, QueryParam, UseBefore, Put, Delete } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { PromotionDto } from './dto/promotion.dto';
import auth from '@middlewares/auth.middleware';

@JsonController('/v1/promotions', { transformResponse: false })
export class OwnerPromotionController {
  private readonly promotionService = new PromotionService();

  @Get('/all')
  @OpenAPI({ summary: 'get all promotions' })
  async findAllProduct() {
    const promotions = await this.promotionService.findAll();

    return promotions;
  }

  @Get('/time')
  @OpenAPI({ summary: 'Get promotions by time' })
  async getPromotionByTime(@QueryParam('starttime') starttime: string, @QueryParam('endtime') endtime: string) {
    const promotions = await this.promotionService.getPromotionByTime(starttime, endtime);
    return promotions;
  }

  @Get('/code/:code')
  @OpenAPI({ summary: 'Get promotion by code' })
  async getPromotionByCode(@Param('code') code: string) {
    const promotions = await this.promotionService.getPromotionByCode(code);

    return promotions;
  }

  @Post('/')
  @OpenAPI({ summary: 'Create a promotion' })
  @UseBefore(validationMiddleware(PromotionDto, 'body'))
  @UseBefore(auth())
  async createPromotion(@Body() promotionData: PromotionDto) {
    const promotion = await this.promotionService.createPromotion(promotionData);

    return promotion;
  }

  @Put('/')
  @OpenAPI({ summary: 'Uppdate Promotion information' })
  @UseBefore(validationMiddleware(PromotionDto, 'body'))
  @UseBefore(auth())
  async updatePromotion(@Body() promotionData: PromotionDto) {
    const promotion = await this.promotionService.updatePromotion(promotionData);
    return promotion;
  }

  @Delete('/:code')
  @OpenAPI({ summary: 'delete promotion by code' })
  @UseBefore(auth())
  async deletePromotion(@Param('code') code: string) {
    const result = await this.promotionService.deletePromotion(code);
    return result;
  }
}
