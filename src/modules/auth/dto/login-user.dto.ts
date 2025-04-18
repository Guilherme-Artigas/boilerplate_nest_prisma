import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'admin.master@email.com', maxLength: 191 })
  @IsString()
  @MaxLength(191)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678', minLength: 8, maxLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  password: string;
}
