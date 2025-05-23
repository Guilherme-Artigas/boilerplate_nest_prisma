import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateCompanyDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'My Company Ltda' })
  name: string;
  @ApiProperty({ example: '12.345.678/0001-90' })
  cnpj: string;
  @ApiProperty({ example: 'Rua Exemplo, 1000' })
  address: string;
  @ApiProperty({ example: '2024-05-21T20:00:00.000Z' })
  createdAt: Date;
  @ApiProperty({ example: '2024-05-21T20:00:00.000Z' })
  updatedAt: Date;
}

export class ResponseGetCompanyDto extends ResponseCreateCompanyDto {}

export class ResponseListCompanyDto extends ResponseCreateCompanyDto {}

export class ResponsePaginatedCompaniesDto {
  @ApiProperty({ type: [ResponseListCompanyDto] })
  companies: ResponseListCompanyDto[];

  @ApiProperty({ example: 5, description: 'Total de páginas disponíveis.' })
  pages: number;

  @ApiProperty({ example: 50, description: 'Total de produtos encontrados.' })
  count: number;
}

export class ResponseUpdateCompanyDto extends ResponseCreateCompanyDto {}

export class ResponseDeleteCompanyDto {
  @ApiProperty({ example: 'Empresa excluída com sucesso' })
  message: string;
}
