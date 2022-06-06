import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { PlanesController } from './planes.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { PlaneSchema } from "../../schemas/plane.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Plane', schema: PlaneSchema }])],
  controllers: [PlanesController],
  providers: [PlanesService]
})
export class PlanesModule {}
