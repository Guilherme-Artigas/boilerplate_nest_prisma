import { IsString, IsNumber, IsInt, IsOptional, IsMongoId } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsInt()
  @IsOptional()
  stock?: number;

  @IsMongoId()
  @IsOptional()
  companyId?: string;
}
