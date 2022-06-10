import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order, OrderDocument } from "../../schemas/order.schema";
import { baseTypes } from "../../../../../../libs/core/src/lib/core/shared/types/baseTypes";
import { orderStatus } from "../../../../../../libs/core/src/lib/core/shared/types/orderStatusTypes";
import { Observable, Subject } from "rxjs";

const { ObjectId } = require("mongodb");

@Injectable()
export class OrdersService {

  ordersSubject: Subject<Order> = new Subject();
  orders$: Observable<Order> = this.ordersSubject.asObservable();

  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto) {
    const createdOrder = new this.orderModel(createOrderDto);
    this.ordersSubject.next(createdOrder);
    return createdOrder.save();
  }

  async findAll() {
    return await this.orderModel.find().exec();
  }

  async findAllByAssistantId(id: string) {
    let _id = "";
    try {
      _id = ObjectId(id);
    }
    catch (err) {
      return String('id not valid')
    }
    return await this.orderModel.find({ assistantId: _id}).exec();
  }
  async findAllByRestockerId(id: string) {
    let _id = "";
    try {
      _id = ObjectId(id);
    }
    catch (err) {
      return String('id not valideee')
    }
    return await this.orderModel.find({ restockerId: _id}).exec();
  }

  async findAllByBase(base: baseTypes) {
    return await this.orderModel.find({base: base}).exec();
  }

  async acceptOrder(orderId: string, restockerId: string) {
    let _id = "";
    let _restockerId = "";
    try {
      _restockerId = ObjectId(restockerId);
      _id = ObjectId(orderId);
    }
    catch (err) {
      return String('id not valieed')
    }
    const newOrder = await this.orderModel.findOneAndUpdate({ _id }, { status: orderStatus.approved, restockerId: _restockerId }, {new: true}).exec();
    this.ordersSubject.next(newOrder);
    return newOrder;
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id).exec();
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

