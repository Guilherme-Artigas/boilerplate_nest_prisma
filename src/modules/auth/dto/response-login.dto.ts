import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { PermissionResponseDto } from 'src/modules/admin/admin-settings/dto/permission-response.dto';

export class ResponseLoginDto {
  @ApiProperty({
    required: false,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDAzYzk0N2ExZTFmYmY3Nzc1YzVlZSIsInJvbGUiOiJVc2VyIiwiaWF0IjoxNzQ0ODQ3NDQ5LCJleHAiOjE3NzU5NTE0NDl9.O37JJzCULIiuc6vVsmR6S2B9Q7r0yGjaZqotCHA4N-o',
  })
  token: string;

  @ApiProperty({ required: false, example: '68003c947a1e1fbf7775c5ee' })
  id: string;

  @ApiProperty({ enum: [Role.Master, Role.Admin], required: false })
  role: Role;

  @ApiProperty({ type: [PermissionResponseDto], required: false })
  adminPermissions: PermissionResponseDto[];
}
