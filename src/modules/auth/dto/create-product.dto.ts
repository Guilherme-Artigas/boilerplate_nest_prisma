import { IsString, IsNumber, IsInt, IsOptional, IsMongoId } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsInt()
  stock: number;

  @IsMongoId()
  companyId: string;
}
