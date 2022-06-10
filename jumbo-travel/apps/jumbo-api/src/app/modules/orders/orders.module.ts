import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeSchema } from "../../schemas/employee.schema";
import { OrderSchema } from "../../schemas/order.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
