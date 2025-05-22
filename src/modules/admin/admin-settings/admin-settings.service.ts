import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@database/PrismaService';
import { AdminPermission, Role, Status, User } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { checkExistingUser } from '@utils/check-existing-user';
import capitalizeFirstLetter from '@utils/capitalize-first-letter';
import handleUpdateUser from '@utils/handle-update-user';
import handleUpdatePermission from '@utils/handle-update-permission';
import type { CreateAdminDto } from '@modules/admin/admin-settings/dto/create-admin.dto';
import type { CreateAdminResponseDto } from '@modules/admin/admin-settings/dto/create-admin-response.dto';
import type { QueryAdminDto } from '@modules/admin/admin-settings/dto/query-admin.dto';
import type { ResponseFindAllAdminDto } from '@modules/admin/admin-settings/dto/response-find-all-admin.dto';
import type { UpdateAdminDto } from '@modules/admin/admin-settings/dto/update-admin.dto';

@Injectable()
export class AdminSettingsService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(payload: CreateAdminDto): Promise<CreateAdminResponseDto> {
    const { name, document, email, phone, password, adminPermissions, fileUrl, fileKey } = payload;

    await checkExistingUser({ document, email, phone });

    const validNewAdmin = {
      name: capitalizeFirstLetter(name),
      email,
      document,
      phone,
      password: hashSync(password, 10),
      fileUrl,
      fileKey,
      role: Role.Admin,
      status: Status.Active,
    };

    const permissionsFound: AdminPermission[] = await this._prisma.adminPermission.findMany({
      where: { name: { in: adminPermissions as any } },
    });

    const user: Partial<User> = await this._prisma.user.create({
      data: { ...validNewAdmin, adminPermissions: { connect: permissionsFound } },
    });

    return { message: 'Admin cadastrado com sucesso.', admin: await this.findById(user.id) };
  }

  findAllPermissions(): Promise<AdminPermission[]> {
    return this._prisma.adminPermission.findMany();
  }

  async findAll(query: QueryAdminDto): Promise<ResponseFindAllAdminDto> {
    const { name, status, take, skip } = query;

    const admins: Partial<User>[] = await this._prisma.user.findMany({
      where: {
        OR: [{ role: Role.Master }, { role: Role.Admin }],
        name: { contains: name },
        status,
      },
      select: {
        id: true,
        name: true,
        email: true,
        document: true,
        phone: true,
        role: true,
        status: true,
        fileUrl: true,
        fileKey: true,
        createdAt: true,
        updatedAt: true,
      },
      take: Number(take) || 10,
      skip: (Number(skip) - 1) * Number(take) || 0,
    });

    const count: number = await this._prisma.user.count({
      where: {
        OR: [{ role: Role.Master }, { role: Role.Admin }],
        name: { contains: name },
        status,
      },
    });

    const pages: number = skip ? Math.ceil(count / take) : 1;

    return { admins, pages, count };
  }

  async findById(id: number): Promise<Partial<User>> {
    const user: Partial<User> = await this._prisma.user.findUnique({
      where: { id, OR: [{ role: Role.Master }, { role: Role.Admin }] },
      select: {
        id: true,
        name: true,
        email: true,
        document: true,
        phone: true,
        role: true,
        status: true,
        fileUrl: true,
        fileKey: true,
        adminPermissions: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new NotFoundException('Admin não encontrado.');

    return user;
  }

  async update(id: number, payload: UpdateAdminDto): Promise<Partial<User>> {
    await this.findById(id);

    const { name, document, email, phone, password, status, adminPermissions } = payload;

    await handleUpdateUser.updateUser(id, payload);

    if (adminPermissions) await handleUpdatePermission.update(id, adminPermissions);

    await this._prisma.user.update({
      where: { id },
      data: {
        name: name ? capitalizeFirstLetter(name) : undefined,
        password: password ? hashSync(password, 10) : undefined,
        status: status ? status : undefined,
        document,
        email,
        phone,
        fileUrl: payload.fileUrl,
        fileKey: payload.fileKey,
      },
    });

    const adminUpdated: Partial<User> = await this.findById(id);

    return adminUpdated;
  }
}
