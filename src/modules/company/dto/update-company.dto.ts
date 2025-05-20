import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, Length, } from 'class-validator';

export class UpdateCompanyDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(3)
    name: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    managerId: string;
}
