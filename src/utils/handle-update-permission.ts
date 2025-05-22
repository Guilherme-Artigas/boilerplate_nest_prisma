import { PrismaService } from '@database/PrismaService';
import { AdminPermission } from '@prisma/client';

class HandleUpdatePermission {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: number, permissions: AdminPermission[]): Promise<void> {
    const permissionsFound: AdminPermission[] = await this.prisma.adminPermission.findMany({
      where: { name: { in: permissions as any } },
    });

    await this.prisma.user.update({ where: { id }, data: { adminPermissions: { set: [] } } });

    await this.prisma.user.update({
      where: { id },
      data: { adminPermissions: { connect: permissionsFound } },
    });
  }
}

export default new HandleUpdatePermission(new PrismaService());
