import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { JumboAuthGuard } from "../auth/auth.guard";

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @UseGuards(JumboAuthGuard)
  @Post()
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @UseGuards(JumboAuthGuard)
  @Get()
  findAll() {
    return this.routesService.findAll();
  }

  @UseGuards(JumboAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(+id);
  }

  @UseGuards(JumboAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @UseGuards(JumboAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}
