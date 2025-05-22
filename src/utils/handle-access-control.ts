import { PrismaService } from '@database/PrismaService';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Role, User } from '@prisma/client';

class HandleAccessControl {
  constructor(private readonly prisma: PrismaService) {}

  verifyAdminRole(payload: Partial<User>): void {
    const { role } = payload;

    if (role !== Role.Master && role !== Role.Admin) {
      throw new ForbiddenException('Acesso não autorizado.');
    }
  }

  async verifyPermission(payload: Partial<User>, permission: string): Promise<void> {
    const { id } = payload;

    const user = await this.prisma.user.findFirst({
      where: { id },
      include: { adminPermissions: true },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado.');

    const validPermission: boolean = user.adminPermissions.some(({ name }) => name === permission);

    if (!validPermission) throw new ForbiddenException('Acesso não autorizado.');
  }
}

export default new HandleAccessControl(new PrismaService());
