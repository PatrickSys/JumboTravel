import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "./product.schema";
import { planeModel } from "../../../../../libs/core/src/lib/core/shared/types/planeModel";


export type PlaneDocument = Plane & Document;

@Schema()
export class Plane {

  @ApiProperty()
  @Prop({ required: true, type: Object  })
  model: planeModel;

  @ApiProperty()
  @Prop({ required: true })
  productsStock: [{
      product: { productInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}, stock: number }
  }];
}

export const PlaneSchema = SchemaFactory.createForClass(Plane);

