import { Module } from '@nestjs/common';
import { PrismaService } from './PrismaService';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
