import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Plane } from "./plane.schema";
import { ApiProperty } from "@nestjs/swagger";
import { baseTypes } from "../../../../../libs/core/src/lib/core/shared/types/baseTypes";


export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order {

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true })
  assistantId: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: false })
  restockerId: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: false })
  planeId: string;

  @ApiProperty()
  @Prop({ required: true })
  products: [{
    product: { productInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}, amount: number }
  }];
  @ApiProperty()
  @Prop({ required: true })
  status: 'requested' | 'approved'

  @ApiProperty()
  @Prop({ required: true })
  destination: string;

}

export const OrderSchema = SchemaFactory.createForClass(Order);

