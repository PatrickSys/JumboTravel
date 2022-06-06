import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductstockService } from './productstock.service';
import { CreateProductstockDto } from './dto/create-productstock.dto';
import { UpdateProductstockDto } from './dto/update-productstock.dto';

@Controller('productstock')
export class ProductstockController {
  constructor(private readonly productstockService: ProductstockService) {}

  @Post()
  create(@Body() createProductstockDto: CreateProductstockDto) {
    return this.productstockService.create(createProductstockDto);
  }

  @Get()
  findAll() {
    return this.productstockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productstockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductstockDto: UpdateProductstockDto) {
    return this.productstockService.update(+id, updateProductstockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productstockService.remove(+id);
  }
}
