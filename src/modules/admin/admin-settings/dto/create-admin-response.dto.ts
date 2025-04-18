import { ApiProperty } from '@nestjs/swagger';
import { CreateAdminAloneDto } from './create-admin-alone.dto';

export class CreateAdminResponseDto {
  @ApiProperty({ example: 'Admin criado com sucesso.' })
  message: string;

  @ApiProperty()
  admin: CreateAdminAloneDto;
}
