import { Module } from '@nestjs/common';

import { AdminSettingsController } from './admin-settings/admin-settings.controller';
import { AdminSettingsService } from './admin-settings/admin-settings.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminSettingsController],
  providers: [AdminSettingsService],
})
export class AdminModule {}
