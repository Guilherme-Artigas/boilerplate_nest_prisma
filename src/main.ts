import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { readFileSync } from 'fs';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  let app: INestApplication;

  if (process.env.ACTIVATE_SSL_CERTIFICATE === 'YES') {
    app = await NestFactory.create(AppModule, {
      cors: { origin: '*' },
      httpsOptions: {
        key: readFileSync(process.env.SSL_KEY, 'utf8'),
        cert: readFileSync(process.env.SSL_CERT, 'utf8'),
        ca: readFileSync(process.env.SSL_CA, 'utf8'),
      },
    });
    app.use(helmet());
    app.use(compression());
  } else {
    app = await NestFactory.create(AppModule, { cors: { origin: '*' } });
  }

  app.setGlobalPrefix('/v1');

  const config = new DocumentBuilder()
    .setTitle('Documentação da API Tech Challenge CroSoften.')
    .setDescription('Essa API foi construída usando NestJS na versão 10.0')
    .setVersion('1.0')
    .addTag('Autenticação')
    .addTag('Configurações - Portal Gerencial')
    .addTag('Upload de arquivos')
    .addTag('Sem autenticação')
    .addTag('My Self')
    .addServer(`${process.env.HOST}:${process.env.PORT}`, 'Testes locais.')
    .addServer(`${process.env.URL_INTEGRATION}`, 'Testes de integrações.')
    .addServer(`${process.env.PROD_HOST}`, 'Ambiente de Produção.')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'bearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  if (process.env.ACTIVATE_SWAGGER === 'YES') {
    SwaggerModule.setup('/v1/docs', app, document);
  }

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT, () => console.log(`Server UP on PORT ${process.env.PORT}`));
}
bootstrap();
