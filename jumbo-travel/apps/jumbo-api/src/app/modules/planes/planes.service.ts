import { Injectable } from '@nestjs/common';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Plane, PlaneDocument } from "../../schemas/plane.schema";

@Injectable()
export class PlanesService {

  constructor(@InjectModel(Plane.name) private planeModel: Model<PlaneDocument>) {}

  async create(plane: Plane): Promise<Plane> {
    const createdPlane = new this.planeModel(plane);
    return createdPlane.save();
  }

  async findAll(): Promise<Plane[]> {
    return this.planeModel.find().exec();
  }
  findOne(id: number) {
    return `This action returns a #${id} plane`;
  }

  update(id: number, updatePlaneDto: UpdatePlaneDto) {
    return `This action updates a #${id} plane`;
  }

  remove(id: number) {
    return `This action removes a #${id} plane`;
  }
}
