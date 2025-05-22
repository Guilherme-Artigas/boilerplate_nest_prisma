import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [LoginService],
  exports: [LoginService],
})
export class LoginModule {}
