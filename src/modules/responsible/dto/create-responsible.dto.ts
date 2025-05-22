import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';

export class CreateResponsibleDto {
  @ApiProperty({ example: 'Ana Souza' })
  @IsString()
  @MaxLength(191)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ana@email.com' })
  @IsEmail()
  @MaxLength(191)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '(11) 98765-4321', required: false })
  @IsString()
  @MaxLength(18)
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}
