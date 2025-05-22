import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { IsCnpj } from 'src/decorators/isCnpj';

export class CreateCompanyDto {
  @ApiProperty({ example: 'My Company Ltda' })
  @IsString()
  @MaxLength(191)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '12.345.678/0001-90' })
  @IsString()
  @MaxLength(18)
  @IsNotEmpty()
  @IsCnpj({ message: 'CNPJ must be valid.' })
  cnpj: string;

  @ApiProperty({ example: 'Avenida Paulista, 1000, São Paulo/SP' })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  address: string;
}
