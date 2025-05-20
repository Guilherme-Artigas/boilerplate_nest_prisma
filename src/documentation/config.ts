import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerConfig(app: INestApplication) {
    const config = new DocumentBuilder()
        .setTitle('Company and Product Management API')
        .setDescription(
            'RESTful API for managing companies and their products. Each product is associated with a single company (many-to-one relationship). Every company has a unique manager responsible for it, including details such as name, phone number, email, and CPF.'
        )
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
