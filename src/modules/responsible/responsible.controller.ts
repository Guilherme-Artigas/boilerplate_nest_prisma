import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
} from '@nestjs/swagger';

import {
  ResponseCreateResponsibleDto,
  ResponseGetResponsibleDto,
  ResponseUpdateResponsibleDto,
  ResponseDeleteResponsibleDto,
  ResponsePaginatedResponsibleDto,
} from './dto/response-responsible.dto';
import { QueryPaginationDto } from 'src/dtos/query-pagination.dto';
import { IsPublic } from '@modules/auth/decorators/is-public.decorator';
import { ResponsibleService } from '@modules/responsible/responsible.service';
import { CreateResponsibleDto } from '@modules/responsible/dto/create-responsible.dto';
import { UpdateResponsibleDto } from '@modules/responsible/dto/update-responsible.dto';

@ApiTags('responsibles')
@Controller('responsibles')
export class ResponsibleController {
  constructor(private readonly service: ResponsibleService) {}

  @IsPublic()
  @Post()
  @ApiBody({ type: CreateResponsibleDto })
  @ApiOperation({ summary: 'Criar responsável.' })
  @ApiOkResponse({ status: 201, type: ResponseCreateResponsibleDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  create(@Body() dto: CreateResponsibleDto): Promise<ResponseCreateResponsibleDto> {
    return this.service.create(dto);
  }

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Listar responsáveis.' })
  @ApiOkResponse({ status: 200, type: ResponsePaginatedResponsibleDto })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  findAll(@Query() query: QueryPaginationDto): Promise<ResponsePaginatedResponsibleDto> {
    return this.service.findAll(query);
  }

  @IsPublic()
  @Get(':id')
  @ApiOperation({ summary: 'Buscar responsável por ID.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiOkResponse({ status: 200, type: ResponseGetResponsibleDto })
  @ApiNotFoundResponse({ description: 'Responsável não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseGetResponsibleDto> {
    return this.service.findOne(id);
  }

  @IsPublic()
  @Patch(':id')
  @ApiBody({ type: UpdateResponsibleDto })
  @ApiOperation({ summary: 'Atualizar responsável.' })
  @ApiOkResponse({ status: 200, type: ResponseUpdateResponsibleDto })
  @ApiNotFoundResponse({ description: 'Responsável não encontrado.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateResponsibleDto,
  ): Promise<ResponseUpdateResponsibleDto> {
    return this.service.update(id, dto);
  }

  @IsPublic()
  @Delete(':id')
  @ApiOperation({ summary: 'Excluir responsável.' })
  @ApiOkResponse({ status: 200, type: ResponseDeleteResponsibleDto })
  @ApiNotFoundResponse({ description: 'Responsável não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseDeleteResponsibleDto> {
    return this.service.remove(id);
  }
}
