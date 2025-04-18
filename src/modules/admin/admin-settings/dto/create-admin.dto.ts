import { ApiProperty } from '@nestjs/swagger';
import { AdminPermission, AdminPermissions } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Hugo Silva', maxLength: 191 })
  @IsString()
  @MaxLength(191)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'hugo.admin@email.com', maxLength: 191 })
  @IsString()
  @MaxLength(191)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '016.817.078-70', maxLength: 18 })
  @IsString()
  @MaxLength(18)
  @IsNotEmpty()
  document: string;

  @ApiProperty({ required: false, example: '11 999999999', maxLength: 191 })
  @MaxLength(191)
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '12345678', minLength: 8, maxLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: AdminPermissions, type: [AdminPermissions] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(AdminPermissions, { each: true })
  adminPermissions: AdminPermission[];

  @ApiProperty({ required: false, example: 'https://example.com/image.jpg', maxLength: 1500 })
  @IsString()
  @MaxLength(1500)
  @IsOptional()
  fileUrl?: string;

  @ApiProperty({ required: false, example: 'image.jpg', maxLength: 1500 })
  @IsString()
  @MaxLength(1500)
  @IsOptional()
  fileKey?: string;
}
