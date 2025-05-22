import { Module } from '@nestjs/common';

import { AdminSettingsController } from './admin-settings/admin-settings.controller';
import { AdminSettingsService } from './admin-settings/admin-settings.service';
import { PrismaModule } from '@database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminSettingsController],
  providers: [AdminSettingsService],
})
export class AdminModule {}
