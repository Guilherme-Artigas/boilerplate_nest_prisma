import { ApiProperty } from '@nestjs/swagger';

export class UserAdminPermissionDto {
  @ApiProperty({ example: '6801b799ffb98fef045afb70' })
  id: string;

  @ApiProperty({ example: 'Dashboard' })
  name: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}
