import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { RouteInterface } from "../../../../../libs/core/src/lib/core/shared/interfaces/route.interface";
import { baseCodes } from "../../../../../libs/core/src/lib/core/shared/types/baseTypes";

export type RoutesDocument = Route & Document;

@Schema()
export class Route implements RouteInterface {
  @ApiProperty()
  @Prop({ required: true })
  destination: string;

  @ApiProperty()
  @Prop({ required: true })
  origin: string;

  @ApiProperty()
  @Prop({ required: true })
  plane: string;

  @ApiProperty()
  @Prop({ required: true })
  status: string;

}

export const RouteSchema = SchemaFactory.createForClass(Route);

