import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Notebook Dell' })
  @IsString()
  @MaxLength(191)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Notebook para uso profissional' })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 2999.99 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  companyId?: number;
}
