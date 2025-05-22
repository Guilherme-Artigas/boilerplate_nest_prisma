import { Module } from '@nestjs/common';
import { DatabaseModule } from '@database/database.module';
import { ProductController } from '@modules/product/product.controller';
import { ProductService } from '@modules/product/product.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
