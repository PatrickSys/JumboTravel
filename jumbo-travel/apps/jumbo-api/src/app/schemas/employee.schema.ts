import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Plane } from "./plane.schema";
import { ApiProperty } from "@nestjs/swagger";


export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @ApiProperty()
  @Prop({ required: true })
  loginIdentifier: number;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Plane", required: false })
  plane: string;

  @ApiProperty()
  @Prop({ required: true })
  base: string;

  @ApiProperty()
  @Prop({ required: true })
  role: "assistant" | "restocker";
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

