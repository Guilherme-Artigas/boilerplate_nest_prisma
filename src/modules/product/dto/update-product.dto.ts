import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, Length, } from 'class-validator';

export class UpdateProductDto {
    @ApiProperty({ example: 'Any Company', description: 'Company name', nullable: true, required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(3)
    name: string;

    @ApiProperty({ example: '94bd055e-4c0d-4a06-888a-600701e3e9a8', description: 'Company Id', nullable: true, required: false })
    @IsOptional()
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    companyId: string;
}
