import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { IsPublic } from '@modules/auth/decorators/is-public.decorator';
import {
  ResponseCreateCompanyDto,
  ResponseDeleteCompanyDto,
  ResponseGetCompanyDto,
  ResponsePaginatedCompaniesDto,
  ResponseUpdateCompanyDto,
} from '@modules/company/dto/response-company.dto';
import { CompanyService } from '@modules/company/company.service';
import { CreateCompanyDto } from '@modules/company/dto/create-company.dto';
import { UpdateCompanyDto } from '@modules/company/dto/update-company.dto';
import { QueryPaginationDto } from 'src/dtos/query-pagination.dto';

@ApiTags('Empresas')
@Controller('companies')
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @IsPublic()
  @Post()
  @ApiBody({ type: CreateCompanyDto })
  @ApiOperation({ summary: 'Rota para criação de uma empresa.' })
  @ApiOkResponse({ status: 201, type: ResponseCreateCompanyDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  create(@Body() data: CreateCompanyDto) {
    return this.service.create(data);
  }

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Listar empresas.' })
  @ApiOkResponse({ status: 200, type: ResponsePaginatedCompaniesDto })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  findAll(@Query() query: QueryPaginationDto): Promise<ResponsePaginatedCompaniesDto> {
    return this.service.findAll(query);
  }

  @IsPublic()
  @Get(':id')
  @ApiOperation({ summary: 'Buscar empresa por ID.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiOkResponse({ status: 200, type: ResponseGetCompanyDto })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @IsPublic()
  @Patch(':id')
  @ApiBody({ type: UpdateCompanyDto })
  @ApiOperation({ summary: 'Atualizar dados de uma empresa.' })
  @ApiOkResponse({ status: 200, type: ResponseUpdateCompanyDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCompanyDto,
  ): Promise<ResponseUpdateCompanyDto> {
    return this.service.update(id, dto);
  }

  @IsPublic()
  @Delete(':id')
  @ApiOperation({ summary: 'Excluir empresa.' })
  @ApiOkResponse({ status: 200, type: ResponseDeleteCompanyDto })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
