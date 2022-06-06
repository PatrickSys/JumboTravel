import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Plane } from "./plane.schema";


export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {

  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Plane", required: true })
  plane: Plane;

  @Prop({ required: true })
  base: string;

  @Prop({ required: true })
  role: "assistant" | "restocker";
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

