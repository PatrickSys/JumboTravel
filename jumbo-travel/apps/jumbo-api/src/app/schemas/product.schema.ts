
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { ProductInterface } from "../../../../../libs/core/src/lib/core/shared/interfaces/product.interface";

export type ProductDocument = Product & Document;

@Schema()
export class Product implements ProductInterface {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  price: number;

  @ApiProperty()
  @Prop({ required: false })
  maxStock: number;

  @ApiProperty()
  @Prop({ required: true })
  measureUnit: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

