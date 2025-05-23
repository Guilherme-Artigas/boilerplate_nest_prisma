import { ApiProperty } from '@nestjs/swagger';

export class ResponseCreateResponsibleDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Ana Souza' })
  name: string;

  @ApiProperty({ example: 'ana@email.com' })
  email: string;

  @ApiProperty({ example: '(11) 98765-4321' })
  phone: string;

  @ApiProperty({ example: 1 })
  companyId: number;

  @ApiProperty({ example: '2024-05-21T20:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-05-21T20:00:00.000Z' })
  updatedAt: Date;
}

export class ResponseGetResponsibleDto extends ResponseCreateResponsibleDto {}

export class ResponseListResponsibleDto extends ResponseCreateResponsibleDto {}

export class ResponsePaginatedResponsibleDto {
  @ApiProperty({ type: [ResponseListResponsibleDto] })
  responsibles: ResponseListResponsibleDto[];

  @ApiProperty({ example: 5, description: 'Total de páginas disponíveis.' })
  pages: number;

  @ApiProperty({ example: 50, description: 'Total de produtos encontrados.' })
  count: number;
}

export class ResponseUpdateResponsibleDto extends ResponseCreateResponsibleDto {}

export class ResponseDeleteResponsibleDto {
  @ApiProperty({ example: 'Responsável excluído com sucesso' })
  message: string;
}
