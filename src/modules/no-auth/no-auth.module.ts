import { Module } from '@nestjs/common';
import { NoAuthService } from './no-auth.service';
import { NoAuthController } from './no-auth.controller';
import { MailService } from '../mail/mail.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NoAuthController],
  providers: [NoAuthService, MailService],
})
export class NoAuthModule {}
