import { PrismaService } from '@database/PrismaService';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import generateCode from '@utils/generate-code';
import { hashSync } from 'bcrypt';
import { NewContactDto } from '../mail/dto/new-contact.dto';
import { MailService } from '../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { TextQueriesDto } from './dto/text-queries.dto';

@Injectable()
export class NoAuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async forgot(email: string): Promise<void> {
    const user: User | null = await this.prisma.user.findFirst({ where: { email } });

    if (!user) throw new NotFoundException();

    const code: string = generateCode();
    const date: Date = new Date();

    await this.prisma.user.update({
      where: { id: user.id },
      data: { code, codeExpiresIn: new Date(date.setHours(date.getHours() + 4)) },
    });

    await this.mailService.forgotPassword(email, code);
  }

  async verifyCode(code: string): Promise<void> {
    const user: User | null = await this.prisma.user.findFirst({ where: { code } });

    if (!user) throw new NotFoundException('Usuário ou código inválido.');

    const date: Date = new Date();

    if (date >= user.codeExpiresIn) {
      throw new UnprocessableEntityException('Código expirou!');
    }
  }

  async reset(payload: ResetPasswordDto): Promise<void> {
    const { code, password, confirmPassword } = payload;

    const user: User | null = await this.prisma.user.findFirst({ where: { code } });

    if (!user) throw new NotFoundException('Usuário ou código inválido.');

    if (password !== confirmPassword) {
      throw new BadRequestException('Senhas devem ser iguais.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        code: null,
        codeExpiresIn: null,
        password: hashSync(password, 10),
      },
    });
  }

  async contactUs(payload: NewContactDto): Promise<void> {
    await this.mailService.contactUs(payload);
  }

  async texts(query: TextQueriesDto) {
    const { type } = query;

    return this.prisma.text.findFirst({ where: { type } });
  }

  users() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        code: true,
        role: true,
        status: true,
        fileUrl: true,
        fileKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  mySelf(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        code: true,
        role: true,
        status: true,
        fileUrl: true,
        fileKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
