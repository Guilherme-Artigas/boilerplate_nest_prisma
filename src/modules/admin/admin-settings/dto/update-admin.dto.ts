import { ApiProperty } from '@nestjs/swagger';
import { AdminPermission, AdminPermissions, Status } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsCpfOrCnpj } from 'src/decorators/is-cpf-or-cnpj';

export class UpdateAdminDto {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(191)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsCpfOrCnpj()
  @MaxLength(18)
  @IsOptional()
  document?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @MaxLength(191)
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(191)
  @IsOptional()
  phone?: string;

  @ApiProperty({ enum: Status, required: false })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({ required: false })
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  password?: string;

  @ApiProperty({ enum: AdminPermissions, type: [AdminPermissions] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(AdminPermissions, { each: true })
  @IsOptional()
  adminPermissions?: AdminPermission[];

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(1500)
  @IsOptional()
  fileUrl?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(1500)
  @IsOptional()
  fileKey?: string;
}
