import mongoose, { ObjectId } from 'mongoose';
import { BadRequestError, NotFoundError } from 'routing-controllers';
import CRUD from '@common/interfaces/crud.interface';
import Baskets, { IBasket, IBasketSchema } from '@models/baskets.model';
import ItemDto from '@v1/basket/dto/item.dto';
import productsModel from '@models/products.model';
import usersModel from '@models/users.model';

export class BasketService implements CRUD<IBasketSchema> {
  private readonly basketModel = Baskets;

  async isUserExist(userId: string) {
    const user = await usersModel.find({ _id: userId }).exec();
    const result = user.length !== 0;

    return result;
  }

  async findAll(limit = 10, page = 0) {
    const query = {};
    const totalDocs = await this.basketModel.countDocuments(query);
    const docs = await this.basketModel
      .find(query)
      .limit(limit)
      .skip(limit * page)
      .sort({ createdAt: -1 })
      .lean();

    return {
      docs: JSON.parse(JSON.stringify(docs)),
      meta: {
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit) || 0,
        page,
      },
    };
  }

  async getById(id: ObjectId): Promise<IBasketSchema | null> {
    return await this.basketModel.findById(id);
  }

  async addItem(itemData: ItemDto) {
    const { userId, item, quantity, size, topping } = itemData;

    // Validate user ID format
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(item)) {
      throw new BadRequestError('Invalid Object ID string');
    }

    const [userExists, product] = await Promise.all([this.isUserExist(userId), productsModel.findById(item).exec()]);

    // Check user existence
    if (!userExists) {
      throw new BadRequestError('User not exist');
    }

    // Check product existence
    if (!product) {
      throw new NotFoundError('Product not exist');
    }

    const price = product.price * quantity;

    const basket = await this.basketModel.findOneAndUpdate(
      { userId },
      { $setOnInsert: { userId, items: [], totalPrice: 0 } },
      { new: true, upsert: true },
    );

    // Find if the item already exists in the basket
    const existedItem = basket.items.find(
      basketItem => basketItem.item.toString() === item && basketItem.size === size && basketItem.topping === topping,
    );

    if (existedItem) {
      // Update the existing item
      existedItem.quantity += quantity;
      existedItem.price += price;
    } else {
      // Add new item to the basket
      basket.items.push({ item, quantity, size, topping, price });
    }

    // Update total price
    basket.totalPrice += price;

    // Save the basket
    await basket.save();

    return basket;
  }

  async removeItem(itemData: ItemDto) {
    const { userId, item, topping, quantity, size } = itemData;

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(item)) {
      throw new BadRequestError('Invalid Object Id');
    }

    const [userExists, product, basket] = await Promise.all([
      this.isUserExist(userId),
      productsModel.findById(item).exec(),
      this.basketModel.findOne({ userId }).exec(),
    ]);

    if (!userExists) {
      throw new BadRequestError('User not exist');
    }

    if (!product) {
      throw new NotFoundError('This item not exist');
    }

    if (!basket) {
      throw new BadRequestError('Basket not exist');
    }

    const itemIndex = basket.items.findIndex(
      basketItem => basketItem.item.toString() === item && basketItem.size === size && basketItem.topping === topping,
    );

    if (itemIndex === -1) {
      throw new BadRequestError('This item not exist in your basket');
    }

    if (basket.items[itemIndex].quantity < quantity) {
      throw new BadRequestError('Product quantity exceeds product quantity in basket');
    }

    const price = product.price * quantity;

    if (basket.items[itemIndex].quantity === quantity) {
      basket.items.splice(itemIndex, 1);
    } else {
      basket.items[itemIndex].quantity -= quantity;
      basket.items[itemIndex].price -= price;
    }

    basket.totalPrice -= price;

    await basket.save();

    return basket;
  }

  async getBasket(userId: string) {
    // check userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestError('Invalid Object Id string');
    }

    const [userExists, basket] = await Promise.all([this.isUserExist(userId), this.basketModel.find({ userId: userId }).exec()]);

    if (!userExists) {
      throw new BadRequestError('User not exist');
    }

    if (basket.length === 0) {
      return await this.basketModel.create({
        userId: userId,
        items: [],
        totalPrice: 0,
      });
    }
    return basket;
  }

  async clearBasket(userId: string) {
    // use when pay the order
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestError('Invalid Object Id');
    }

    if (!(await this.isUserExist(userId))) {
      throw new BadRequestError('User not exist');
    }
    await this.basketModel.findOneAndUpdate({ userId }, { $set: { items: [], totalPrice: 0 } });
    return { message: 'Basket successfully cleared' };
  }
}
