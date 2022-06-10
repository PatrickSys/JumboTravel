import { Injectable } from "@nestjs/common";
import { UpdatePlaneDto } from "./dto/update-plane.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Plane, PlaneDocument } from "../../schemas/plane.schema";
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
    return await this.planeModel.find().populate({
      path: 'productsStock',
      populate: {
        path: 'productInfo',
        model: 'Product'
      }
    }).exec();
  }

  async findOne(id: string) {
    return await this.planeModel.findOne({id: id}).populate({
      path: 'productsStock',
      populate: {
        path: 'productInfo',
        model: 'Product'
      }
    }).exec();
  }

  async update(id: string, updatePlaneDto: UpdatePlaneDto) {
    return await this.planeModel.findOneAndUpdate({ _id: ObjectId(id) }, updatePlaneDto, {new: true}).exec();
  }

  remove(id: string) {
    return `This action removes a #${id} plane`;
  }

  async updateStatus(id: string, newStatus: any) {
    const foundPlane = await this.planeModel.findOne({_id: ObjectId(id)});
    foundPlane.route.status = newStatus.newStatus;

    return await this.planeModel.updateOne({ _id: ObjectId(id) }, { route: foundPlane.route }, {new: true}).exec();
  }
}
