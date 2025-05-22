import { PrismaService } from '@database/PrismaService';
import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import type { CreateProductDto } from 'src/modules/product/dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateProductDto) {
    const { companyId, ...rest } = dto;
    return this.prisma.product.create({
      data: {
        ...rest,
        company: {
          connect: { id: companyId },
        },
      },
    });
  }
  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateProductDto) {
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
