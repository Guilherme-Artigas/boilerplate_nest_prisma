import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';
import { AdminSettingsController } from '@modules/admin/admin-settings/admin-settings.controller';
import { AdminSettingsService } from '@modules/admin/admin-settings/admin-settings.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminSettingsController],
  providers: [AdminSettingsService],
})
export class AdminModule {}
