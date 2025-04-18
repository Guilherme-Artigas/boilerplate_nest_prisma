import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  ObjectCannedACL,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { PrismaService } from '@database/PrismaService';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { File, User } from '@prisma/client';
import { ResponseDeleteOneFileDto } from './dto/response-delete-one-file.dto';
import { ResponseOneFileDto } from './dto/response-one-file.dto';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
  }

  async uploadOneFile(file: Express.Multer.File): Promise<ResponseOneFileDto> {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: ObjectCannedACL.public_read,
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));

    return {
      fileUrl: `https://${this.bucketName}.s3.amazonaws.com/${uploadParams.Key}`,
      fileKey: uploadParams.Key,
    };
  }

  async uploadManyFiles(files: Express.Multer.File[]): Promise<ResponseOneFileDto[]> {
    const uploadPromises = files.map(async (file) => {
      const uploadParams: PutObjectCommandInput = {
        Bucket: this.bucketName,
        Key: `${Date.now()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: ObjectCannedACL.public_read,
      };

      await this.s3Client.send(new PutObjectCommand(uploadParams));

      return {
        fileUrl: `https://${this.bucketName}.s3.amazonaws.com/${uploadParams.Key}`,
        fileKey: uploadParams.Key,
      };
    });

    return Promise.all(uploadPromises);
  }

  async getFileById(id: string): Promise<File> {
    const file: File | null = await this.prisma.file.findFirst({ where: { id } });

    if (!file) throw new NotFoundException('Arquivo não encontrado.');

    return file;
  }

  async deleteProfilePhoto(fileKey: string): Promise<Partial<User>> {
    const user: Partial<User> = await this.getUserByFileKey(fileKey);

    const deleteParams: DeleteObjectCommandInput = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    await this.s3Client.send(new DeleteObjectCommand(deleteParams));

    await this.prisma.user.update({
      where: { id: user.id },
      data: { fileUrl: null, fileKey: null },
    });

    const userUpdated: Partial<User> = await this.getUserById(user.id);

    return userUpdated;
  }

  async deleteFileById(id: string): Promise<{ message: string }> {
    const file = await this.getFileById(id);

    const deleteParams: DeleteObjectCommandInput = {
      Bucket: this.bucketName,
      Key: file.fileKey,
    };

    await this.s3Client.send(new DeleteObjectCommand(deleteParams));

    await this.prisma.file.delete({ where: { id } });

    return { message: 'Arquivo deletado com sucesso.' };
  }

  private async getUserByFileKey(fileKey: string): Promise<ResponseDeleteOneFileDto> {
    const user: Partial<User> | null = await this.prisma.user.findFirst({
      where: { fileKey },
      select: { id: true, name: true, fileUrl: true, fileKey: true },
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  private async getUserById(id: string): Promise<ResponseDeleteOneFileDto> {
    const user: Partial<User> | null = await this.prisma.user.findFirst({
      where: { id },
      select: { id: true, name: true, fileUrl: true, fileKey: true },
    });

    if (!user) throw new NotFoundException();

    return user;
  }
}
