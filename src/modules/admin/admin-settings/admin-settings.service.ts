import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@database/PrismaService';
import { AdminPermission, Role, Status, User } from '@prisma/client';
import capitalizeFirstLetter from '@utils/capitalizeFirstLetter';
import { checkExistingUser } from '@utils/checkExistingUser';
import handleUpdatePermission from '@utils/HandleUpdatePermission';
import handleUpdateUser from '@utils/HandleUpdateUser';
import { hashSync } from 'bcrypt';
import { CreateAdminResponseDto } from './dto/create-admin-response.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { QueryAdminDto } from './dto/query-admin.dto';
import { ResponseFindAllAdminDto } from './dto/response-find-all-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

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
      data: {
        ...validNewAdmin,
        userPermissions: { create: permissionsFound.map((p) => ({ permissionId: p.id })) },
      },
    });

    return { message: 'Admin cadastrado com sucesso.', admin: await this.findById(user.id) };
  }

  findAllPermissions(): Promise<AdminPermission[]> {
    return this._prisma.adminPermission.findMany();
  }

  async findAll(query: QueryAdminDto): Promise<ResponseFindAllAdminDto> {
    const { name, status, take = 10, skip = 1 } = query;

    const pageSize = Number(take) || 10;
    const currentPage = Number(skip) || 1;

    const offset = (currentPage - 1) * pageSize;

    const [admins, total] = await Promise.all([
      this._prisma.user.findMany({
        where: {
          OR: [{ role: Role.Master }, { role: Role.Admin }],
          AND: [{ name: { contains: name } }, { status: { equals: status } }],
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
        take: pageSize,
        skip: offset,
        orderBy: { createdAt: 'desc' },
      }),
      this._prisma.user.count({
        where: {
          OR: [{ role: Role.Master }, { role: Role.Admin }],
          AND: [{ name: { contains: name } }, { status: { equals: status } }],
        },
      }),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return {
      admins,
      pages: totalPages,
      count: total,
      currentPage,
      pageSize,
    };
  }

  async findById(id: string): Promise<Partial<User>> {
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
        userPermissions: {
          include: {
            permission: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new NotFoundException('Admin não encontrado.');

    return user;
  }

  async update(id: string, payload: UpdateAdminDto): Promise<Partial<User>> {
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
