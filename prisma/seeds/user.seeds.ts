import { PrismaClient, Role, Status } from '@prisma/client';
import { hashSync } from 'bcrypt';

export async function seedUser(prisma: PrismaClient) {
  await prisma.user.createMany({
    data: [
      {
        name: 'user one',
        email: 'user.one@email.com',
        password: hashSync('12345678', 10),
        role: Role.User,
        status: Status.Active,
        document: '0987654321',
        phone: '0987654321',
      },
    ],
  });

  console.log('Users seed added successfully 🌱.');
}
