import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from 'src/documentation/config';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
import { DataSource } from 'typeorm';
import { seed } from 'src/db/seed';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    swaggerConfig(app);
    app.useGlobalInterceptors(new ResponseInterceptor());
    const dataSource = app.get(DataSource);
    await seed(dataSource);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
