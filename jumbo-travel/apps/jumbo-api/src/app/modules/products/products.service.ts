import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../../schemas/product.schema";
import { Model } from "mongoose";
const { ObjectId } = require('mongodb');

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  findOne(id: string) {
    return this.productModel.findOne()
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findOneAndUpdate({ _id: ObjectId(id) }, updateProductDto, {new: true}).exec();
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
