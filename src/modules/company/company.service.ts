import { PrismaService } from '@database/PrismaService';
import { Injectable } from '@nestjs/common';
import type { UpdateCompanyDto } from './dto/update-company.dto';
import type { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateCompanyDto) {
    return this.prisma.company.create({ data });
  }

  findAll() {
    return this.prisma.company.findMany();
  }

  findOne(id: number) {
    return this.prisma.company.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateCompanyDto) {
    return this.prisma.company.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.company.delete({ where: { id } });
  }
}
