import { ApiProperty } from "@nestjs/swagger";
import { Prop } from "@nestjs/mongoose";

export interface ProductsInterface {
  name: string;
  price: number;
  maxStock: number;
  measureUnit: string;
  stock: number;
}
