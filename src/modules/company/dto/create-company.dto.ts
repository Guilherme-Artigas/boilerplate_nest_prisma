import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsUUID, Length, } from 'class-validator';

export class CreateCompanyDto {
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    })
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(3)
    name: string;

    @ApiProperty()
    @IsUUID()
    @IsString()
    @IsNotEmpty()
    managerId: string;
}
