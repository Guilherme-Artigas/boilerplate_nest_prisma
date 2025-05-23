import { IsPublic } from '@modules/auth/decorators/is-public.decorator';
import { CreateProductDto } from '@modules/product/dto/create-product.dto';
import {
  ResponseCreateProductDto,
  ResponseDeleteProductDto,
  ResponseGetProductDto,
  ResponsePaginatedProductsDto,
  ResponseUpdateProductDto,
} from '@modules/product/dto/response-product.dto';
import { UpdateProductDto } from '@modules/product/dto/update-product.dto';
import { ProductService } from '@modules/product/product.service';
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
import { QueryPaginationDto } from 'src/dtos/query-pagination.dto';

@ApiTags('Produtos')
@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @IsPublic()
  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiOperation({ summary: 'Criar produto.' })
  @ApiOkResponse({ status: 201, type: ResponseCreateProductDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  create(@Body() data: CreateProductDto): Promise<ResponseCreateProductDto> {
    return this.service.create(data);
  }

  @IsPublic()
  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos.' })
  @ApiOkResponse({ status: 200, type: ResponsePaginatedProductsDto })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  findAll(@Query() query: QueryPaginationDto): Promise<ResponsePaginatedProductsDto> {
    return this.service.findAll(query);
  }

  @IsPublic()
  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID.' })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiOkResponse({ status: 200, type: ResponseGetProductDto })
  @ApiNotFoundResponse({ description: 'Produto não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ResponseGetProductDto> {
    return this.service.findOne(id);
  }

  @IsPublic()
  @Patch(':id')
  @ApiBody({ type: UpdateProductDto })
  @ApiOperation({ summary: 'Atualizar produto.' })
  @ApiOkResponse({ status: 200, type: ResponseUpdateProductDto })
  @ApiNotFoundResponse({ description: 'Produto não encontrado.' })
  @ApiBadRequestResponse({ description: 'Requisição inválida.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProductDto) {
    return this.service.update(id, data);
  }

  @IsPublic()
  @Delete(':id')
  @ApiOperation({ summary: 'Excluir produto.' })
  @ApiOkResponse({ status: 200, type: ResponseDeleteProductDto })
  @ApiNotFoundResponse({ description: 'Produto não encontrado.' })
  @ApiBadRequestResponse({ description: 'ID inválido.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ResponseDeleteProductDto> {
    return this.service.remove(id);
  }
}
