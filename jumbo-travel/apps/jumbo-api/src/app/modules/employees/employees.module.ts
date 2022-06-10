import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { EmployeeSchema } from "../../schemas/employee.schema";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
  OrdersModule],
  controllers: [EmployeesController],
  providers: [EmployeesService]
})
export class EmployeesModule {}

