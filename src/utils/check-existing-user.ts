import { ConflictException } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

const prisma: PrismaClient = new PrismaClient();

/**
 * Verifica a existência de um usuário com base nos dados fornecidos.
 *
 * @param payload Os dados do usuário a serem verificados.
 * @param r Indica se a função deve retornar o usuário encontrado ou lançar uma exceção caso o usuário exista. O padrão é false.
 * @returns Um objeto parcial do usuário encontrado ou null se nenhum usuário corresponder aos dados fornecidos.
 * @throws ConflictException Se um usuário com os dados fornecidos já existir e o parâmetro r for false.
 */
async function checkExistingUser(payload: Partial<User>, r?: boolean): Promise<Partial<User>> {
  const { id, document, email, phone } = payload;

  const user: User | null = await prisma.user.findFirst({
    where: { OR: [{ id }, { document }, { email }, { phone }] },
  });

  if (user && !r) throw new ConflictException('Já existe usuário com os dados informados.');

  return user;
}

export { checkExistingUser };
