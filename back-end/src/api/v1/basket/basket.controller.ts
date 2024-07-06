import { Body, Delete, Get, JsonController, Post, Put, UseBefore } from 'routing-controllers';
import { BasketService } from '@services/v1/basket.service';
import { OpenAPI } from 'routing-controllers-openapi';
import auth from '@middlewares/auth.middleware';
import { validationMiddleware } from '@middlewares/validation.middleware';
import ItemDto from './dto/item.dto';
import ClearBasketDto from './dto/clearBasket.dto';
import GetBasketDto from './dto/getBasket.dto';

@JsonController('/v1/baskets', { transformResponse: false })
export class BasketController {
  private readonly basketService = new BasketService();

  @Post('/add-to-basket')
  @OpenAPI({ summary: 'add item to  basket' })
  @UseBefore(auth())
  @UseBefore(validationMiddleware(ItemDto, 'body'))
  async addItem(@Body() itemData: ItemDto) {
    const basket = await this.basketService.addItem(itemData);
    return basket;
  }

  @Delete('/clear-basket')
  @OpenAPI({ summary: 'clear all items in basket' })
  @UseBefore(auth())
  @UseBefore(validationMiddleware(ClearBasketDto, 'body'))
  async clearBasket(@Body() clearData: ClearBasketDto) {
    const message = await this.basketService.clearBasket(clearData.userID);
    return message;
  }

  @Get('/get-basket')
  @OpenAPI({ summary: 'Get basket' })
  @UseBefore(auth())
  @UseBefore(validationMiddleware(GetBasketDto, 'body'))
  async getBasket(@Body() getData: GetBasketDto) {
    const basket = await this.basketService.getBasket(getData.userId);
    return basket;
  }

  @Delete('/delete-basket')
  @OpenAPI({ summary: 'delete item in basket' })
  @UseBefore(auth())
  @UseBefore(validationMiddleware(ItemDto, 'body'))
  async deleteItem(@Body() itemData: ItemDto) {
    const basket = await this.basketService.removeItem(itemData);
    return basket;
  }
}
