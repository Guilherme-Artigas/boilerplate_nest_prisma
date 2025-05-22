import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { ResponsibleController } from '@modules/responsible/responsible.controller';
import { ResponsibleService } from '@modules/responsible/responsible.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ResponsibleController],
  providers: [ResponsibleService],
})
export class ResponsibleModule {}
