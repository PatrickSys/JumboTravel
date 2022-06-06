import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "./modules/products/products.module";
import { ProductstockModule } from "./modules/productstock/productstock.module";
import { PlanesModule } from "./modules/planes/planes.module";
import { EmployeesModule } from "./modules/employees/employees.module";

@Module({
  imports: [ConfigModule.forRoot(),
   MongooseModule.forRoot('mongodb://localhost/nest'),
    ProductsModule,
    ProductstockModule,
    PlanesModule,
    EmployeesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

