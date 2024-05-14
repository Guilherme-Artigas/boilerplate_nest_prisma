import { PrismaService } from '@database/PrismaService';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Role, User } from '@prisma/client';

class HandleAccessControl {
  constructor(private readonly prisma: PrismaService) {}

  verifyAdminRole(payload: Partial<User>): void {
    const { role } = payload;

    if (role !== Role.MASTER && role !== Role.ADMIN) {
      throw new ForbiddenException('Acesso não autorizado.');
    }
  }

  async verifyPermission(payload: Partial<User>, permission: string): Promise<void> {
    const { id } = payload;

    const user = await this.prisma.user.findFirst({
      where: { id },
      include: { permissions: true },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const validPermission: boolean = user.permissions.some(({ name }) => name === permission);

    if (!validPermission) throw new ForbiddenException('Acesso não autorizado.');
  }
}

export default new HandleAccessControl(new PrismaService());