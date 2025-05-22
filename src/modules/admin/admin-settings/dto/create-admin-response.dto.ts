import type { CreateAdminAloneDto } from '@modules/admin/admin-settings/dto/create-admin-alone.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  admin: CreateAdminAloneDto;
}
