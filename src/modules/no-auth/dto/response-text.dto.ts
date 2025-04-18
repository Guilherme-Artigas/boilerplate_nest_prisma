import { ApiProperty } from '@nestjs/swagger';
import { TextType } from '@prisma/client';

export class ResponseTextDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: TextType })
  type: TextType;

  @ApiProperty()
  text: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
