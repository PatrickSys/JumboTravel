import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "../../schemas/product.schema";
import { Model } from "mongoose";
import { Employee, EmployeeDocument } from "../../schemas/employee.schema";
const { ObjectId } = require('mongodb');

@Injectable()
export class EmployeesService {

  constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>) {}

  async create(employee: Employee): Promise<Employee> {
    const createdEmployee = new this.employeeModel(employee);
    return createdEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findByLoginId(loginId: number): Promise<Employee> {
    return await this.employeeModel.findOne({loginIdentifier: loginId}).exec();
  }

  async findOne(id: number) {
    return await this.employeeModel.findById(id).exec();
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeeModel.findOneAndUpdate({_id: ObjectId(id)}, updateEmployeeDto, {new:true}).exec();
  }

  async remove(id: number) {
    return await this.employeeModel.deleteOne({_id: ObjectId(id)}).exec();
  }
}
