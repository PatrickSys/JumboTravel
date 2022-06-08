import { Module } from "@nestjs/common";
import { RoutesService } from "./routes.service";
import { RoutesController } from "./routes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { RouteSchema } from "../../schemas/route.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Route", schema: RouteSchema }])],
  controllers: [RoutesController],
  providers: [RoutesService]
})
export class RoutesModule {
}
