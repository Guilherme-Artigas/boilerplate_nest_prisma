import { PrismaService } from '@database/PrismaService';
import type { CreateResponsibleDto } from '@modules/responsible/dto/create-responsible.dto';
import type { UpdateResponsibleDto } from '@modules/responsible/dto/update-responsible.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponsibleService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateResponsibleDto) {
    const { companyId, ...rest } = dto;
    return this.prisma.responsible.create({
      data: {
        ...rest,
        company: {
          connect: { id: companyId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.responsible.findMany();
  }

  findOne(id: number) {
    return this.prisma.responsible.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateResponsibleDto) {
    return this.prisma.responsible.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.responsible.delete({ where: { id } });
  }
}
