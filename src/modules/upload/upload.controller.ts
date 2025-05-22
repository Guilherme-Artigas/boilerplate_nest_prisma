import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IfileEntity } from '@interfaces/entities/Ifile.entity';
import { ImessageEntity } from '@interfaces/entities/Imessage.entity';
import { IsPublic } from '@modules/auth/decorators/is-public.decorator';
import type { DeleteOneFileDto } from '@modules/upload/dto/delete-one-file.dto';
import { ResponseDeleteOneFileDto } from '@modules/upload/dto/response-delete-one-file.dto';
import { ResponseOneFileDto } from '@modules/upload/dto/response-one-file.dto';
import { UploadService } from '@modules/upload/upload.service';
import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { Readable } from 'stream';

@ApiTags('Upload de arquivos')
@Controller()
export class UploadController {
  constructor(
    private readonly _uploadService: UploadService,
    private readonly _configService: ConfigService,
  ) {}

  @IsPublic()
  @Post('upload/one-file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Rota para upload de um arquivo.',
    description:
      'Essa rota aceita arquivos dos tipos png, jpg, jpeg, pdf. Armazena local/nuvem e retorna o link do local de armazenagem.',
  })
  @ApiResponse({ status: 201, type: ResponseOneFileDto })
  @ApiResponse({ status: 422, description: 'Tamanho ou tipo de arquivo inválido.' })
  @ApiBody({
    schema: { type: 'object', properties: { file: { type: 'string', format: 'binary' } } },
  })
  async uploadOneFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /png|jpg|jpeg|pdf/ })
        .addMaxSizeValidator({ maxSize: 8388608 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    const response = await this._uploadService.uploadOneFile(file);
    return { ...response };
  }

  @IsPublic()
  @Post('upload/many-files')
  @UseInterceptors(FilesInterceptor('files', 5))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Rota para upload de múltiplos arquivos.',
    description:
      'Essa rota aceita no máximo 5 arquivos dos tipos png, jpg, jpeg, pdf. Armazena local/nuvem e retorna o link do local de armazenagem.',
  })
  @ApiResponse({ status: 201, type: [ResponseOneFileDto] })
  @ApiResponse({ status: 422, description: 'Tamanho ou tipo de arquivo inválido.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { files: { type: 'array', items: { type: 'string', format: 'binary' } } },
    },
  })
  async uploadManyFiles(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /png|jpg|jpeg|pdf/ })
        .addMaxSizeValidator({ maxSize: 8388608 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    files: Express.Multer.File[],
  ) {
    const response = await this._uploadService.uploadManyFiles(files);
    return response;
  }

  @IsPublic()
  @Get('one-file/:id')
  @ApiOperation({ summary: 'Rota para recuperar informações de um arquivo pelo id.' })
  @ApiResponse({ status: 200, type: IfileEntity })
  async getFileById(@Param('id', ParseIntPipe) id: number) {
    return this._uploadService.getFileById(id);
  }

  @IsPublic()
  @Get('one-file/download/:id')
  @ApiOperation({ summary: 'Rota para download de arquivos.' })
  @ApiProduces('application/octet-stream')
  @ApiResponse({
    status: 200,
    description: 'Download efetuado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Arquivo não encontrado.',
  })
  async dowload(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const file = await this.getFileById(id);

    const s3Client = new S3Client({ region: this._configService.get<string>('AWS_REGION') });

    const getObjectCommand = new GetObjectCommand({
      Bucket: this._configService.get<string>('AWS_BUCKET_NAME'),
      Key: file.fileKey,
    });

    const { Body, ContentType } = await s3Client.send(getObjectCommand);

    if (!Body) throw new NotFoundException('Arquivo não encontrado');

    res.set({
      'Content-Type': ContentType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename=${file.fileKey}`,
    });

    const stream = Body instanceof Readable ? Body : Readable.from(Body as any);

    return stream.pipe(res);
  }

  @IsPublic()
  @Delete('profile-photo')
  @ApiOperation({ summary: 'Rota para deletar foto de perfil dos usuários.' })
  @ApiResponse({ status: 200, type: ResponseDeleteOneFileDto })
  @ApiQuery({
    name: 'fileKey',
    required: true,
    description: 'A chave do arquivo no S3 a ser excluído',
  })
  async deleteProfilePhoto(@Query() query: DeleteOneFileDto) {
    const { fileKey } = query;
    return this._uploadService.deleteProfilePhoto(fileKey);
  }

  @IsPublic()
  @Delete('one-file/:id')
  @ApiOperation({ summary: 'Rota para deletar um arquivo pelo seu id.' })
  @ApiResponse({ status: 200, type: ImessageEntity })
  async deleteFileById(@Param('id', ParseIntPipe) id: number) {
    return this._uploadService.deleteFileById(id);
  }
}
