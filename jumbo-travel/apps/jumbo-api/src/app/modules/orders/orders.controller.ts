import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { baseTypes } from "../../../../../../libs/core/src/lib/core/shared/types/baseTypes";
import { JumboAuthGuard } from "../auth/auth.guard";

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JumboAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @UseGuards(JumboAuthGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
  @UseGuards(JumboAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
  @UseGuards(JumboAuthGuard)
  @Get('assistant/:id')
  findByAssistant(@Param('id') id: string) {
    return this.ordersService.findAllByAssistantId(id);
  }

  @UseGuards(JumboAuthGuard)
  @Get('restocker/:id')
  findByRestocker(@Param('id') id: string) {
    return this.ordersService.findAllByRestockerId(id);
  }

  @UseGuards(JumboAuthGuard)
  @Get('base/:baseCode')
  findByBase(@Param('baseCode') baseCode: baseTypes) {
    return this.ordersService.findAllByBase(baseCode);
  }

  @UseGuards(JumboAuthGuard)
  @Post('accept/:id')
  async acceptOrder(@Param('id') id: string, @Body() restockerId: string) {
    return this.ordersService.acceptOrder(id, restockerId['restockerId']);
  }
  @UseGuards(JumboAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @UseGuards(JumboAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
