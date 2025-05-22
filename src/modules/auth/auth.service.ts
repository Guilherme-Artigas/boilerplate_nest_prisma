import type { UserPayload } from '@modules/auth/models/UserPayload';
import type { UserToken } from '@modules/auth/models/UserToken';
import { LoginService } from '@modules/login/login.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Status, User } from '@prisma/client';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userArg: User): Promise<UserToken> {
    const payload: UserPayload = {
      id: userArg.id,
      role: userArg.role,
    };

    const token: string = this.jwtService.sign(payload);
    const user = await this.loginService.findByEmail(userArg.email);

    return { token, id: user.id, role: user.role, adminPermissions: user.adminPermissions };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.loginService.findByEmail(email);

    if (user && user.status === Status.Active) {
      const isPasswordValid: boolean = compareSync(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Acesso não autorizado.');
  }
}
