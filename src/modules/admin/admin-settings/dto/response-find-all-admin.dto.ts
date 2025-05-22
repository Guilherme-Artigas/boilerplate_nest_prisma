import { CreateAdminAloneDto } from '@modules/admin/admin-settings/dto/create-admin-alone.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseFindAllAdminDto {
  @ApiProperty({ type: [CreateAdminAloneDto] })
  admins: CreateAdminAloneDto[];

  @ApiProperty()
  pages: number;

  @ApiProperty()
  count: number;
}
