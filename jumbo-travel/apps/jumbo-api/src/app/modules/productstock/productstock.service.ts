import { Injectable } from "@nestjs/common";
import { UpdateProductstockDto } from "./dto/update-productstock.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Stock, StockDocument } from "../../schemas/stock.schema";

@Injectable()
export class ProductstockService {

  constructor(@InjectModel(Stock.name) private stockModel: Model<StockDocument>) {
  }

  async create(stock: Stock): Promise<Stock> {
    const createdStock = new this.stockModel(stock);
    return createdStock.save();
  }

  async findAll(): Promise<Stock[]> {
    return this.stockModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} productstock`;
  }

  update(id: number, updateProductstockDto: UpdateProductstockDto) {
    return `This action updates a #${id} productstock`;
  }

  remove(id: number) {
    return `This action removes a #${id} productstock`;
  }
}
