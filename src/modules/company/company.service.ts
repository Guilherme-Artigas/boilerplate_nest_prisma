import { PrismaService } from '@database/PrismaService';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ResponseCreateCompanyDto,
  ResponseDeleteCompanyDto,
  ResponseGetCompanyDto,
  ResponsePaginatedCompaniesDto,
  ResponseUpdateCompanyDto,
} from '@modules/company/dto/response-company.dto';
import { QueryPaginationDto } from 'src/dtos/query-pagination.dto';
import { CreateCompanyDto } from '@modules/company/dto/create-company.dto';
import { UpdateCompanyDto } from '@modules/company/dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCompanyDto): Promise<ResponseCreateCompanyDto> {
    return this.prisma.company.create({ data });
  }

  async findAll(query: QueryPaginationDto): Promise<ResponsePaginatedCompaniesDto> {
    const take = Number(query.take) || 10; // max products per page
    const skip = Number(query.skip) || 1; // page number

    const [companies, count] = await Promise.all([
      this.prisma.company.findMany({
        take,
        skip: (skip - 1) * take,
      }),
      this.prisma.company.count(),
    ]);

    const pages = Math.ceil(count / take);

    return {
      companies,
      pages: pages === 0 ? 1 : pages,
      count,
    };
  }

  async findOne(id: number): Promise<ResponseGetCompanyDto> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return this.prisma.company.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateCompanyDto): Promise<ResponseUpdateCompanyDto> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return this.prisma.company.update({ where: { id }, data: dto });
  }

  async remove(id: number): Promise<ResponseDeleteCompanyDto> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    await this.prisma.company.delete({ where: { id } });

    return { message: 'Empresa excluída com sucesso' };
  }
}
