import { Body, Controller, Delete, Get, Param, Patch, Post, Sse, UseGuards } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { map, Observable } from "rxjs";
import { OrdersService } from "../orders/orders.service";
import { JumboAuthGuard } from "../auth/auth.guard";

@Controller("employees")
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService,
              private ordersService: OrdersService) {
  }

  @UseGuards(JumboAuthGuard)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @UseGuards(JumboAuthGuard)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @UseGuards(JumboAuthGuard)
  @Get("/find/:loginId")
  findByLoginId(@Param("loginId") loginId: number) {
    return this.employeesService.findByLoginId(+loginId);
  }

  @UseGuards(JumboAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @UseGuards(JumboAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.employeesService.remove(+id);
  }

  @Sse("/sse")
  sse(): Observable<MessageEvent> {
    return this.ordersService.orders$.pipe(map((orderInfo) => ({ data: orderInfo })));
  }
}

export interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}
