import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  BadRequestException, UseGuards
} from "@nestjs/common";
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ObjectId } from "mongoose";
import { JumboAuthGuard } from "../auth/auth.guard";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JumboAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JumboAuthGuard)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JumboAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JumboAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string  , @Body() updateProductDto: UpdateProductDto, @Res({ passthrough: true }) res: Response) {
    const update = await this.productsService.update(id, updateProductDto);
    if(!update) return  {...res.clone, status: 500, message: 'Error when updating product, please check format'}
    return update;
  }

  @UseGuards(JumboAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
