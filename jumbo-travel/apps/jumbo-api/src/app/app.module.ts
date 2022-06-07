import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "./modules/products/products.module";
import { PlanesModule } from "./modules/planes/planes.module";
import { EmployeesModule } from "./modules/employees/employees.module";

@Module({
  imports: [ConfigModule.forRoot(),
   MongooseModule.forRoot('mongodb://admin:admin@localhost:27017', {
     dbName: 'JumboDB'
   }),
    ProductsModule,
    PlanesModule,
    EmployeesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

