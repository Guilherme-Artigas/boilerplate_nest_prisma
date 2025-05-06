import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  controllers: [CompaniesController],
  providers: [PrismaService, CompaniesService],
})
export class CompaniesModule {}
