import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './modules/auth/auth.module';
import { LoginModule } from './modules/login/login.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
// import { UploadModule } from './modules/upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { NoAuthModule } from './modules/no-auth/no-auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { MobileModule } from './modules/mobile/mobile.module';
import { WebModule } from './modules/web/web.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    LoginModule,
    // UploadModule,
    MailModule,
    NoAuthModule,
    AdminModule,
    MobileModule,
    WebModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
