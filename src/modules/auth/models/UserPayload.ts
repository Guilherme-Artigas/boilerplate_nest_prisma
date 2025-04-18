import { Role } from '@prisma/client';

export interface UserPayload {
  email?: string;
  id: string;
  role: Role;
  iat?: number;
  exp?: number;
}
