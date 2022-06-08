import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Plane } from "./plane.schema";
import { ApiProperty } from "@nestjs/swagger";


export type OrderDocument = Order & Document;

@Schema({timestamps: true})
export class Order {

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true })
  assistantId: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true })
  restockerId: string;

  @ApiProperty()
  @Prop({ required: true })
  products: [{
    product: { productInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}, amount: number }
  }];
}

export const OrderSchema = SchemaFactory.createForClass(Order);

