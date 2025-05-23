import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@database/PrismaService';
import { QueryPaginationDto } from 'src/dtos/query-pagination.dto';
import { CreateResponsibleDto } from '@modules/responsible/dto/create-responsible.dto';
import {
  ResponseCreateResponsibleDto,
  ResponseDeleteResponsibleDto,
  ResponseGetResponsibleDto,
  ResponsePaginatedResponsibleDto,
  ResponseUpdateResponsibleDto,
} from '@modules/responsible/dto/response-responsible.dto';
import { UpdateResponsibleDto } from '@modules/responsible/dto/update-responsible.dto';

@Injectable()
export class ResponsibleService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateResponsibleDto): Promise<ResponseCreateResponsibleDto> {
    const { companyId, ...rest } = dto;

    const companyExists = await this.prisma.company.findUnique({
      where: { id: dto.companyId },
    });

    if (!companyExists) {
      throw new NotFoundException('Empresa não encontrada.');
    }

    const responsible = await this.prisma.responsible.create({
      data: {
        ...rest,
        company: { connect: { id: companyId } },
      },
    });

    return responsible;
  }

  async findAll(query: QueryPaginationDto): Promise<ResponsePaginatedResponsibleDto> {
    const take = Number(query.take) || 10; // max products per page
    const skip = Number(query.skip) || 1; // page number

    const [responsibles, count] = await Promise.all([
      this.prisma.responsible.findMany({
        take,
        skip: (skip - 1) * take,
      }),
      this.prisma.responsible.count(),
    ]);

    const pages = Math.ceil(count / take);

    return {
      responsibles,
      pages: pages === 0 ? 1 : pages,
      count,
    };
  }

  async findOne(id: number): Promise<ResponseGetResponsibleDto> {
    const responsible = await this.prisma.responsible.findUnique({ where: { id } });
    if (!responsible) {
      throw new NotFoundException('Responsável não encontrado');
    }

    return responsible;
  }

  async update(id: number, dto: UpdateResponsibleDto): Promise<ResponseUpdateResponsibleDto> {
    const exists = await this.prisma.responsible.findUnique({ where: { id } });

    if (!exists) {
      throw new NotFoundException('Responsável não encontrado');
    }

    const companyExists = await this.prisma.company.findUnique({
      where: { id: dto.companyId },
    });

    if (!companyExists) {
      throw new NotFoundException('Empresa informada não encontrada.');
    }

    const data = {
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      company: dto.companyId ? { connect: { id: dto.companyId } } : undefined,
    };

    const updated = await this.prisma.responsible.update({
      where: { id },
      data,
    });

    return updated;
  }

  async remove(id: number): Promise<ResponseDeleteResponsibleDto> {
    const responsible = await this.prisma.responsible.findUnique({ where: { id } });
    if (!responsible) {
      throw new NotFoundException('Responsável não encontrado');
    }

    await this.prisma.responsible.delete({ where: { id } });
    return { message: 'Responsável excluído com sucesso' };
  }
}
