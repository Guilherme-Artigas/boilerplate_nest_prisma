import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { IsCnpj } from 'src/decorators/isCnpj';

export class UpdateCompanyDto {
  @ApiPropertyOptional({ example: 'My Company Ltda' })
  @IsString()
  @MaxLength(191)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: '12.345.678/0001-90' })
  @IsString()
  @MaxLength(18)
  @IsOptional()
  @IsCnpj({ message: 'CNPJ must be valid.' })
  cnpj?: string;

  @ApiPropertyOptional({ example: 'Avenida Paulista, 1000, São Paulo/SP' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  address?: string;
}
