import { PrismaService } from '@database/PrismaService';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string, include?: Prisma.UserInclude) {
    return this.prisma.user.findUnique({ where: { email }, include });
  }
}
