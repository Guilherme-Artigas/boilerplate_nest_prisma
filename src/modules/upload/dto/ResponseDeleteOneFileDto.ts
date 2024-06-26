import { ApiProperty } from '@nestjs/swagger';

export class ResponseDeleteOneFileDto {
  @ApiProperty()
  id?: number;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  fileUrl?: string;
  @ApiProperty()
  fileKey?: string;
}
