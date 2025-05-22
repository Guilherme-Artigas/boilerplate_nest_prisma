import { Module } from '@nestjs/common';
import { NoAuthService } from './no-auth.service';
import { NoAuthController } from './no-auth.controller';
import { MailService } from '../mail/mail.service';
import { PrismaModule } from '@database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NoAuthController],
  providers: [NoAuthService, MailService],
})
export class NoAuthModule {}
