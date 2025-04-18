import { ApiProperty } from '@nestjs/swagger';
import { UserAdminPermissionDto } from './user-admin-permission.dto';

export class UserAdminPermissionsDto {
  @ApiProperty({ example: '6801b95433b91ea78ce04997' })
  id: string;

  @ApiProperty({ example: '6801b95433b91ea78ce04996' })
  userId: string;

  @ApiProperty({ example: '6801b799ffb98fef045afb70' })
  permissionId: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  @ApiProperty({ type: UserAdminPermissionDto })
  permission: UserAdminPermissionDto;
}
