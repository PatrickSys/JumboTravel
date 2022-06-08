import { Injectable } from "@nestjs/common";
import { CreateRouteDto } from "./dto/create-route.dto";
import { UpdateRouteDto } from "./dto/update-route.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Route, RoutesDocument } from "../../schemas/route.schema";

@Injectable()
export class RoutesService {
  constructor(@InjectModel(Route.name) private routeModel: Model<RoutesDocument>) {
  }

  async create(createRouteDto: CreateRouteDto) {
    const createdRoute = new this.routeModel(createRouteDto);
    return createdRoute.save();
  }

  async findAll() {
    return await this.routeModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} route`;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
