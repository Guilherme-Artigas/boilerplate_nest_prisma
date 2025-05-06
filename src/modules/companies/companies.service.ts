import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async assignUser(companyId: number, userId: number) {
    const company = await this.prisma.company.findUnique({ where: { id: companyId } });
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!company || !user) throw new NotFoundException();
    return this.prisma.company.update({
      where: { id: companyId },
      data: { users: { connect: { id: userId } } },
      include: { users: true },
    });
  }

  async create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: createCompanyDto,
    });
  }

  async findAll() {
    return this.prisma.company.findMany({
      include: { products: true },
    });
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: { products: true },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async update(id: number, updateCompanyDto: CreateCompanyDto) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.prisma.company.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  async remove(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.prisma.company.delete({
      where: { id },
    });
  }
}
