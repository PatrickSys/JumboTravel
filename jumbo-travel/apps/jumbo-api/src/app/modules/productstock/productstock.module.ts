import { Module } from "@nestjs/common";
import { ProductstockService } from "./productstock.service";
import { ProductstockController } from "./productstock.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { StockSchema } from "../../schemas/stock.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Stock", schema: StockSchema }])],
  controllers: [ProductstockController],
  providers: [ProductstockService]
})
export class ProductstockModule {
}
