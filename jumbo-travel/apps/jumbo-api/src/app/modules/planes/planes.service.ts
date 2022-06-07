import { Injectable } from '@nestjs/common';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Plane, PlaneDocument, PlaneSchema } from "../../schemas/plane.schema";
import { Product } from "../../schemas/product.schema";
const { ObjectId } = require('mongodb');

@Injectable()
export class PlanesService {

  constructor(@InjectModel(Plane.name) private planeModel: Model<PlaneDocument>) {}

  async create(plane: Plane): Promise<Plane> {
    const createdPlane = new this.planeModel(plane);
    return createdPlane.save();
  }

  async findAll(): Promise<Plane[]> {
    const found = await this.planeModel.find().populate({
      path: 'productsStock',
        populate: {
          path: 'productInfo',
          model: 'Product'
      }
    }).exec();

    found.forEach(plane => plane.productsStock.forEach(prod => {}));
    return found;
  }

  findOne(id: number) {
    return `This action returns a #${id} plane`;
  }

  update(id: string, updatePlaneDto: UpdatePlaneDto) {
    return this.planeModel.findOneAndUpdate({ _id: ObjectId(id) }, updatePlaneDto, {new: true}).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} plane`;
  }
}
