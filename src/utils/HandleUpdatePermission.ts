import { PrismaService } from '@database/PrismaService';
import { AdminPermissions } from '@prisma/client';

class HandleUpdatePermission {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, permissions: AdminPermissions[]): Promise<void> {
    console.log(permissions);
    const permissionsFound = await this.prisma.adminPermission.findMany({
      where: { name: { in: permissions } },
    });

    await this.prisma.userPermission.deleteMany({
      where: { userId: id },
    });

    await this.prisma.userPermission.createMany({
      data: permissionsFound.map((permission) => ({
        userId: id,
        permissionId: permission.id,
      })),
    });
  }
}

export default new HandleUpdatePermission(new PrismaService());
