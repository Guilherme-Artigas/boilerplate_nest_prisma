import { ApiProperty } from '@nestjs/swagger';
import { UserAdminPermissionsDto } from './user-admin-permissions.dto';

export class CreateAdminAloneDto {
  @ApiProperty({ example: '6801b95433b91ea78ce04996' })
  id?: string;

  @ApiProperty({ example: 'Hugo Silva' })
  name?: string;

  @ApiProperty({ example: 'hugo.admin@email.com' })
  email?: string;

  @ApiProperty({ example: '016.817.078-70' })
  document?: string;

  @ApiProperty({ example: '11 999999999' })
  phone?: string;

  @ApiProperty({ example: 'Admin' })
  role?: string;

  @ApiProperty({ example: 'Ativo' })
  status?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  fileUrl?: string;

  @ApiProperty({ example: 'image.jpg' })
  fileKey?: string;

  @ApiProperty({ type: [UserAdminPermissionsDto] })
  userPermissions?: UserAdminPermissionsDto[];

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt?: Date;

  @ApiProperty()
  updatedAt?: Date;
}
