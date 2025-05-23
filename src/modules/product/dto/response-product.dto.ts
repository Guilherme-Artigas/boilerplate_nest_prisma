import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateProductDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Notebook Dell' })
  name: string;

  @ApiProperty({ example: 'Notebook para uso profissional' })
  description: string;

  @ApiProperty({ example: 2999.99 })
  price: number;

  @ApiProperty({ example: 1 })
  companyId: number;

  @ApiProperty({ example: '2024-05-21T20:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-05-21T20:00:00.000Z' })
  updatedAt: Date;
}

export class ResponseGetProductDto extends ResponseCreateProductDto {}

export class ResponseListProductDto extends ResponseCreateProductDto {}

export class ResponsePaginatedProductsDto {
  @ApiProperty({ type: [ResponseListProductDto] })
  products: ResponseListProductDto[];

  @ApiProperty({ example: 5, description: 'Total de páginas disponíveis.' })
  pages: number;

  @ApiProperty({ example: 50, description: 'Total de produtos encontrados.' })
  count: number;
}

export class ResponseUpdateProductDto extends ResponseCreateProductDto {}

export class ResponseDeleteProductDto {
  @ApiProperty({ example: 'Produto excluído com sucesso' })
  message: string;
}
