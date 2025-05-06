import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, MaxLength, IsPositive } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MaxLength(191)
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  stock: number;

  @ApiProperty()
  @IsNumber()
  companyId: number;

  @IsString()
  @MaxLength(1500)
  @IsOptional()
  fileUrl?: string;

  @IsString()
  @MaxLength(1500)
  @IsOptional()
  fileKey?: string;
}
