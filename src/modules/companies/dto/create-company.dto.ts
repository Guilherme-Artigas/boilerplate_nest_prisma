import { IsString, MaxLength } from 'class-validator';
import { IsCpfOrCnpj } from 'src/decorators/isCpfOrCnpj';

export class CreateCompanyDto {
  @IsString()
  @MaxLength(191)
  name: string;

  @IsCpfOrCnpj()
  @MaxLength(18)
  cnpj: string;
}
