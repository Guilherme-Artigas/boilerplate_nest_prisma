import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { PrismaModule } from '@database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
