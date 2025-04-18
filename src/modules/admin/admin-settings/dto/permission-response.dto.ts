import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponseDto {
  @ApiProperty({ example: '68003c947a1e1fbf7775c5ea' })
  id: string;

  @ApiProperty({ example: 'Dashboard' })
  name: string;

  @ApiProperty({ example: '2025-04-16T10:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-04-16T10:00:00.000Z' })
  updatedAt: Date;
}
