import { PrismaService } from '@database/PrismaService';
import type { CreateProductDto } from '@modules/product/dto/create-product.dto';
import {
  ResponseCreateProductDto,
  ResponseDeleteProductDto,
  ResponseGetProductDto,
  ResponsePaginatedProductsDto,
  ResponseUpdateProductDto,
} from '@modules/product/dto/response-product.dto';
import type { UpdateProductDto } from '@modules/product/dto/update-product.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { productToDto } from '@utils/product-to-dto';
import { QueryPaginationDto } from 'src/dtos/query-pagination.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto): Promise<ResponseCreateProductDto> {
    const { companyId, ...rest } = dto;

    const companyExists = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!companyExists) {
      throw new NotFoundException('Empresa não encontrada.');
    }

    const product = await this.prisma.product.create({
      data: {
        ...rest,
        company: {
          connect: { id: companyId },
        },
      },
    });

    return productToDto(product);
  }

  async findAll(query: QueryPaginationDto): Promise<ResponsePaginatedProductsDto> {
    const take = Number(query.take) || 10; // max products per page
    const skip = Number(query.skip) || 1; // page number

    const [products, count] = await Promise.all([
      this.prisma.product.findMany({
        take,
        skip: (skip - 1) * take,
      }),
      this.prisma.product.count(),
    ]);

    const pages = Math.ceil(count / take);

    return {
      products: products.map(productToDto),
      pages: pages === 0 ? 1 : pages,
      count,
    };
  }

  async findOne(id: number): Promise<ResponseGetProductDto> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return productToDto(product);
  }

  async update(id: number, dto: UpdateProductDto): Promise<ResponseUpdateProductDto> {
    const exists = await this.prisma.product.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException('Produto não encontrado');
    }

    const companyExists = await this.prisma.company.findUnique({
      where: { id: dto.companyId },
    });

    if (!companyExists) {
      throw new NotFoundException('Empresa informada não encontrada.');
    }

    const data = {
      name: dto.name,
      description: dto.description,
      price: dto.price,
      company: dto.companyId ? { connect: { id: dto.companyId } } : undefined,
    };

    const updated = await this.prisma.product.update({
      where: { id },
      data,
    });

    return productToDto(updated);
  }

  async remove(id: number): Promise<ResponseDeleteProductDto> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    await this.prisma.product.delete({ where: { id } });

    return { message: 'Produto excluído com sucesso' };
  }
}
