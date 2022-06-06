import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import mongoose from "mongoose";


export type PlaneDocument = Plane & Document;

@Schema()
export class Plane {

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  productsStock: [
    { id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      stock: number
    }
  ];
}

export const PlaneSchema = SchemaFactory.createForClass(Plane);

