import { AdminPermissions, PrismaClient, Role, Status } from '@prisma/client';
import { hashSync } from 'bcrypt';

export async function seedAdmin(prisma: PrismaClient) {
  const permissions = Object.values(AdminPermissions);

  const newMaster = await prisma.user.create({
    data: {
      name: 'master',
      email: 'admin.master@email.com',
      password: hashSync('12345678', 10),
      role: Role.Master,
      status: Status.Active,
      document: '1234567890',
      phone: '1234567890',
    },
  });

  for (const permission of permissions) {
    const adminPermission = await prisma.adminPermission.create({
      data: {
        name: permission,
      },
    });

    await prisma.userPermission.create({
      data: {
        userId: newMaster.id,
        permissionId: adminPermission.id,
      },
    });
  }

  console.log('Admins seed added successfully 🌱.');
}
