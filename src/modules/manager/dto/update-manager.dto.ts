import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import Cpf from 'src/modules/manager/vo/cpf';
import Phone from 'src/modules/manager/vo/phone';

export class UpdateManagerDto {
    @ApiProperty({
        example: 'ana.silva@example.com',
        description: 'The email address of the company manager. Must be a valid email format.',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Ana Carolina Silva',
        description: 'Full name of the company manager.',
        required: false,
    })
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: '31991234567',
        description: 'Mobile phone number of the manager, including area code. Must be 11 digits and start with 9.',
        required: false,
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => new Phone(value).getValue())
    phone: string;

    @ApiProperty({
        example: '123.456.789-09',
        description: 'Brazilian CPF (individual taxpayer registry identification) of the manager. Must be a valid CPF, with or without formatting.',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => new Cpf(value).getValue())
    cpf: string;
}
