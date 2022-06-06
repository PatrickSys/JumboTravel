import * as mongoose from 'mongoose';
import { Product } from "./product.schema";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



export type StockDocument = Stock & Document;

@Schema()
export class Stock {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: string;

  @Prop({ required: true })
  stock: number;
}

export const StockSchema = SchemaFactory.createForClass(Stock);

