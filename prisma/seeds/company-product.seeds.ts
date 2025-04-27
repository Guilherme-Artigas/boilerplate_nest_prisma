import { PrismaClient } from '@prisma/client';

export async function seedCompanyAndProduct(prisma: PrismaClient) {
  try {
    await prisma.product.deleteMany();
    await prisma.company.deleteMany();

    const company1 = await prisma.company.create({
      data: {
        name: 'Comapny A',
        cnpj: '12.345.678/0001-95',
      },
    });

    const company2 = await prisma.company.create({
      data: {
        name: 'Comapny B',
        cnpj: '12.345.678/0001-96',
      },
    });

    await prisma.product.createMany({
      data: [
        {
          name: 'Product A',
          description: 'Description A',
          price: 100,
          stock: 10,
          companyId: company1.id,
        },
        {
          name: 'Product B',
          description: 'Description B',
          price: 200,
          stock: 20,
          companyId: company2.id,
        },
      ],
    });

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
