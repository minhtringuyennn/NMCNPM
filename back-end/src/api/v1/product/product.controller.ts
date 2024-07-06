import { ObjectId } from 'mongoose';
import {
  BadRequestError,
  Body,
  Delete,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
  QueryParam,
  UseBefore,
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import auth from '@middlewares/auth.middleware';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { IProduct } from '@models/products.model';
import { ProductService } from '@services/v1';

import DeleteDto from './dtos/deleteProduct.dto';
import ProductDto from './dtos/product.dto';
import SearchDto from './dtos/searchProduct.dto';

@JsonController('/v1/products', { transformResponse: false })
export class ProductController {
  private readonly productService = new ProductService();

  @Get('/all')
  @OpenAPI({ summary: 'Get all products' })
  @ResponseSchema(IProduct, { isArray: true })
  async findAllProduct(@QueryParam('sort') sort: string) {
    const products = await this.productService.findAll();

    if (sort === 'true') {
      products.docs = products.docs.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    return products;
  }

  @Get('/filer')
  @OpenAPI({ summary: 'filter products by their prices' })
  @ResponseSchema(IProduct)
  async filter(@QueryParam('minprice') minprice: string, @QueryParam('maxprice') maxprice: string, @QueryParam('sort') sort: string) {
    const query: any = {};

    if (minprice && maxprice) {
      const minPrice = Number(minprice);
      const maxPrice = Number(maxprice);

      if (isNaN(minPrice) || isNaN(maxPrice) || minPrice <= 0 || maxPrice <= 0) {
        throw new BadRequestError('Invalid price');
      }

      query.price = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    }

    let products = await this.productService.filterProduct(query);

    if (sort === 'true') {
      products = products.sort((a, b) => a.productName.localeCompare(b.productName));
    }

    return products;
  }

  @Get('/id/:id')
  @OpenAPI({ summary: 'find product by its id' })
  @ResponseSchema(IProduct)
  async findProductById(@Param('id') id: string) {
    const product = await this.productService.getProductByID(id);

    return product;
  }

  @Get('/name')
  @OpenAPI({ summary: 'find product by its name' })
  @UseBefore(validationMiddleware(SearchDto, 'body'))
  @ResponseSchema(IProduct)
  async findProductByName(@Body() productName: SearchDto) {
    const product = await this.productService.getProductByName(productName.productName);

    if (!product) {
      throw new NotFoundError('Product Name not exist');
    }

    return product;
  }

  @Post('/')
  @HttpCode(201)
  @OpenAPI({ summary: 'create a product' })
  @ResponseSchema(IProduct)
  @UseBefore(validationMiddleware(ProductDto, 'body'))
  async create(@Body() productData: ProductDto) {
    const newProduct = await this.productService.createProduct(productData);
    return newProduct;
  }

  @Put('/:id')
  @OpenAPI({ summary: 'update a product' })
  @UseBefore(validationMiddleware(ProductDto, 'body'))
  @ResponseSchema(IProduct)
  async updateByID(@Body() productData: ProductDto, @Param('id') id: string) {
    const product = await this.productService.getProductByID(id);

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    Object.keys(productData).forEach(key => {
      product[key] = productData[key];
    });

    await product.save();

    return product;
  }

  @Delete('/:id')
  @OpenAPI({ summary: 'delete product' })
  async deleteByID(@Param('id') id: string) {
    const query = {
      _id: id,
    };
    const product = await this.productService.filterProduct(query);
    const message = await this.productService.deleteProduct(product[0].id);
    return message;
  }
}
