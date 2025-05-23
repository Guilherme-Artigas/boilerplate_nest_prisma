import { ResponseListProductDto } from '@modules/product/dto/response-product.dto';
import { Product } from '@prisma/client';

export function productToDto(product: Product): ResponseListProductDto {
  return {
    ...product,
    price: Number(product.price),
  };
}
