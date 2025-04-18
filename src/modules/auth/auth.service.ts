import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminPermission, Prisma, Status, User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { LoginService } from '../login/login.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

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
    const include = {
      userPermissions: {
        include: {
          permission: true,
        },
      },
    } satisfies Prisma.UserInclude;

    const user = await this.loginService.findByEmail(userArg.email, include);
    const permissions = user.userPermissions.map((up) => up['permission']) as AdminPermission[];

    return {
      token,
      id: user.id,
      role: user.role,
      adminPermissions: permissions,
    };
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
