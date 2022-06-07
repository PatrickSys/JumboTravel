import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from "@nestjs/common";
import { PlanesService } from './planes.service';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { UpdateProductDto } from "../products/dto/update-product.dto";

@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @Post()
  create(@Body() createPlaneDto: CreatePlaneDto) {
    return this.planesService.create(createPlaneDto);
  }

  @Get()
  findAll() {
    return this.planesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planesService.findOne(+id);
  }


  @Patch(':id')
  async update(@Param('id') id: string  , @Body() updatePlaneDto: UpdatePlaneDto, @Res({ passthrough: true }) res: Response) {
    const update = await this.planesService.update(id, updatePlaneDto);
    if(!update) return  {...res.clone, status: 500, message: 'Error when updating plane, please check format'}
    return update;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planesService.remove(+id);
  }
}
