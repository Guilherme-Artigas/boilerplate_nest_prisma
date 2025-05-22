import type { CreateResponsibleDto } from '@modules/responsible/dto/create-responsible.dto';
import type { UpdateResponsibleDto } from '@modules/responsible/dto/update-responsible.dto';
import { ResponsibleService } from '@modules/responsible/responsible.service';
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Responsáveis')
@Controller('responsibles')
export class ResponsibleController {
  constructor(private readonly service: ResponsibleService) {}

  @Post()
  create(@Body() data: CreateResponsibleDto) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateResponsibleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
