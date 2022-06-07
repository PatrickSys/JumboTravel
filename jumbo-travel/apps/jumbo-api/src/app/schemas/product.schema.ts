
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  price: number;

  @ApiProperty()
  @Prop({ required: true })
  maxStock: number;

  @ApiProperty()
  @Prop({ required: true })
  measureUnit: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

