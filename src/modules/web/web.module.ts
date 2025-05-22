import { PrismaModule } from '@database/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [],
})
export class WebModule {}
