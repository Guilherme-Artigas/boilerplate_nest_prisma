import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './modules/company/company.module'
import { ManagerModule } from './modules/manager/manager.module';
import { ProductModule } from './modules/product/product.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        CompanyModule,
        ManagerModule,
        ProductModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
