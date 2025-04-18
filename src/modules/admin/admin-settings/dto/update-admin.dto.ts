import { ApiProperty } from '@nestjs/swagger';
import { AdminPermissions, Status } from '@prisma/client';
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
import { IsCpfOrCnpj } from 'src/decorators/isCpfOrCnpj';

export class UpdateAdminDto {
  @ApiProperty({ required: false, example: 'João Augusto' })
  @IsString()
  @MaxLength(191)
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, example: '029.337.240-30' })
  @IsCpfOrCnpj()
  @MaxLength(18)
  @IsOptional()
  document?: string;

  @ApiProperty({ required: false, example: 'joaoaugusto@gmail.com' })
  @IsEmail()
  @MaxLength(191)
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false, example: '79 988470928' })
  @IsString()
  @MaxLength(191)
  @IsOptional()
  phone?: string;

  @ApiProperty({ enum: Status, required: false, example: 'Active' })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({ required: false, example: '12345678' })
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
  adminPermissions?: AdminPermissions[];

  @ApiProperty({ required: false, example: 'https://example.com/image.jpg' })
  @IsString()
  @MaxLength(1500)
  @IsOptional()
  fileUrl?: string;

  @ApiProperty({ required: false, example: 'image.jpg' })
  @IsString()
  @MaxLength(1500)
  @IsOptional()
  fileKey?: string;
}
