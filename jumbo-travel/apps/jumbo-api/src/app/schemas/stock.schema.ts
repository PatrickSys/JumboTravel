import * as mongoose from 'mongoose';
import { Product } from "./product.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";



export type StockDocument = Stock & Document;

@Schema()
export class Stock {

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: string;

  @ApiProperty()
  @Prop({ required: true })
  stock: number;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.String, ref: 'Product', required: true })
  measureUnit: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);

