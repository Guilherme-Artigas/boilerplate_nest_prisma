import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Length, } from 'class-validator';

export class CreateProductDto {
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    })
    @ApiProperty({ example: 'Any Product', description: 'Product name' })
    @IsString()
    @IsNotEmpty()
    @Length(3)
    name: string;

    @ApiProperty({ example: '94bd055e-4c0d-4a06-888a-600701e3e9a8', description: 'Company Id' })
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    companyId: string;
}
