import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';

export class UpdateResponsibleDto {
  @ApiPropertyOptional({ example: 'Ana Souza' })
  @IsString()
  @MaxLength(191)
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'ana@email.com' })
  @IsEmail()
  @MaxLength(191)
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '(11) 98765-4321' })
  @IsString()
  @MaxLength(18)
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 1 })
  @IsNumber()
  @IsOptional()
  companyId?: number;
}
