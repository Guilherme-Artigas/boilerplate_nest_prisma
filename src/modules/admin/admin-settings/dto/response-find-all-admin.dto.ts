import { ApiProperty } from '@nestjs/swagger';
import { CreateAdminAloneDto } from './create-admin-alone.dto';

export class ResponseFindAllAdminDto {
  @ApiProperty({
    example: [
      {
        id: '6801b95433b91ea78ce04996',
        name: 'João Augusto Mário Da Cruz',
        email: 'joao.admin@email.com',
        document: '701.012.767-02',
        phone: '79 988470928',
        role: 'Admin',
        status: 'Active',
        fileUrl: 'https://example.com/image.jpg',
        fileKey: 'image.jpg',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      },
    ],
  })
  admins: CreateAdminAloneDto[];

  @ApiProperty()
  pages: number;

  @ApiProperty()
  count: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  pageSize: number;
}
