import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional } from 'class-validator';
import { IsCpfOrCnpj } from 'src/decorators/isCpfOrCnpj';

export class UpdateCompanyDto {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(191)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsCpfOrCnpj()
  @MaxLength(18)
  @IsOptional()
  cnpj?: string;
}
