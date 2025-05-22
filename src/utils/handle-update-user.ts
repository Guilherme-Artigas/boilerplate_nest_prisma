import { ConflictException } from '@nestjs/common';
import { User } from '@prisma/client';
import { checkExistingUser } from './checkExistingUser';

class HandleUpdateUser {
  constructor() {}

  async updateUser(id: number, payload: Partial<User>): Promise<void> {
    const { document, email, phone } = payload;

    const checkUserByEmail = await checkExistingUser({ email }, true);
    const checkUserByDocument = await checkExistingUser({ document }, true);
    const checkUserByPhone = await checkExistingUser({ phone }, true);

    const allowsChanges: boolean =
      (checkUserByEmail && checkUserByEmail.id !== id) ||
      (checkUserByDocument && checkUserByDocument.id !== id) ||
      (checkUserByPhone && checkUserByPhone.id !== id);

    if (allowsChanges) {
      throw new ConflictException('Já existe usuário cadastrado com esses dados');
    }
  }
}

export default new HandleUpdateUser();
