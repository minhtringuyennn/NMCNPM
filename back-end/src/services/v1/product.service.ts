import mongoose, { ObjectId } from 'mongoose';
import CRUD from '@common/interfaces/crud.interface';
import Products, { IProduct, IProductSchema } from '@models/products.model';
import ProductDto from '@v1/product/dtos/product.dto';
import { BadRequestError, NotFoundError } from 'routing-controllers';

export class ProductService implements CRUD<IProductSchema> {
  private readonly productModel = Products;

  async isProductNameTaken(productName: string): Promise<boolean> {
    const product = await this.productModel.findOne({ productName });

    return !!product;
  }

  async getProductByName(productName: string) {
    return await this.productModel.findOne({ productName });
  }

  async getProductByID(productID: string) {
    if (!mongoose.Types.ObjectId.isValid(productID)) {
      throw new BadRequestError('Invalid Object ID string');
    }

    const query = { _id: productID };
    const product = await this.productModel.find(query).exec();

    if (product.length === 0) {
      throw new NotFoundError('Product ID not exist');
    }

    return product[0];
  }

  async findAll(limit = 10, page = 0) {
    const query = {};
    const totalDocs = await this.productModel.countDocuments(query);
    const docs = await this.productModel
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

  async getById(id: ObjectId): Promise<IProductSchema | null> {
    return await this.productModel.findById(id);
  }

  async createProduct(productData: ProductDto) {
    const { productName } = productData;

    if (await this.isProductNameTaken(productName)) {
      throw new BadRequestError('Product Name already Taken');
    }
    const newProduct = await this.productModel.create({ ...productData });

    return newProduct;
  }

  async updateProductByName(productData: ProductDto) {
    const { productName } = productData;
    const product = await this.getProductByName(productName);

    if (!product) {
      throw new NotFoundError('Product name not exist');
    }

    Object.assign(product, productData);
    await product.save();

    return product;
  }

  async deleteProduct(objectIDOfProduct: ObjectId) {
    await this.productModel.findByIdAndDelete(objectIDOfProduct);

    return { message: 'Product successfully deleted' };
  }

  async filterProduct(query: any) {
    const products = await this.productModel.find(query).exec();

    if (products.length === 0) {
      throw new NotFoundError('Product with this data not exist');
    }

    return products;
  }
}
