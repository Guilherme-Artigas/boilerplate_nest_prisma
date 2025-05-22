import { Module } from '@nestjs/common';
import { ResponsibleController } from './responsible.controller';
import { ResponsibleService } from './responsible.service';
import { PrismaModule } from '@database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ResponsibleController],
  providers: [ResponsibleService],
})
export class ResponsibleModule {}
