import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class QueryPaginationDto {
  @ApiProperty({
    required: false,
    description: 'Quantidade de registros por página. Exemplo: take=10',
    example: 10,
  })
  @IsNumberString()
  @IsOptional()
  take?: number;

  @ApiProperty({
    required: false,
    description: 'Número da página. Exemplo: skip=2 (segunda página)',
    example: 1,
  })
  @IsNumberString()
  @IsOptional()
  skip?: number;
}
