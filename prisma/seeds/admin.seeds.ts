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
    },
  });

  await prisma.adminPermission.createMany({
    data: permissions.map((name) => ({
      name,
      admin: { connect: { id: newMaster.id } },
    })),
  });

  console.log('Admins seed added successfully 🌱.');
}
