import { ApiProperty } from '@nestjs/swagger';

export class ResponseDeleteOneFileDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  fileUrl?: string;
  @ApiProperty()
  fileKey?: string;
}
