import { AdminSettingsService } from '@modules/admin/admin-settings/admin-settings.service';
import { CreateAdminAloneDto } from '@modules/admin/admin-settings/dto/create-admin-alone.dto';
import { CreateAdminResponseDto } from '@modules/admin/admin-settings/dto/create-admin-response.dto';
import type { CreateAdminDto } from '@modules/admin/admin-settings/dto/create-admin.dto';
import { PermissionResponseDto } from '@modules/admin/admin-settings/dto/permission-response.dto';
import type { QueryAdminDto } from '@modules/admin/admin-settings/dto/query-admin.dto';
import { ResponseFindAllAdminDto } from '@modules/admin/admin-settings/dto/response-find-all-admin.dto';
import type { UpdateAdminDto } from '@modules/admin/admin-settings/dto/update-admin.dto';
import { CurrentUser } from '@modules/auth/decorators/current-user.decorator';
import { IsPublic } from '@modules/auth/decorators/is-public.decorator';
import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminPermission, User } from '@prisma/client';
import handleAccessControl from '@utils/handle-access-control';

@ApiTags('Configurações - Portal Gerencial')
@Controller('admin-settings')
export class AdminSettingsController {
  constructor(private readonly _adminSettingsService: AdminSettingsService) {}

  @Post()
  @ApiOperation({
    summary: 'Rota para criar admins no portal gerencial.',
    security: [{ bearerAuth: [] }],
  })
  @ApiCreatedResponse({ type: CreateAdminResponseDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async create(@CurrentUser() user: User, @Body() payload: CreateAdminDto) {
    handleAccessControl.verifyAdminRole(user);

    await handleAccessControl.verifyPermission(user, 'Settings');

    return this._adminSettingsService.create(payload);
  }

  @IsPublic()
  @Get('all-permissions')
  @ApiOperation({ summary: 'Rota que recupera todas as permissões.' })
  @ApiOkResponse({ type: [PermissionResponseDto] })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async findAllPermissions(): Promise<AdminPermission[]> {
    return this._adminSettingsService.findAllPermissions();
  }

  @Get()
  @ApiOperation({
    summary: 'Rota que lista todos os admins cadastrados.',
    security: [{ bearerAuth: [] }],
  })
  @ApiOkResponse({ type: ResponseFindAllAdminDto })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async findAll(@CurrentUser() user: User, @Query() query: QueryAdminDto) {
    handleAccessControl.verifyAdminRole(user);

    await handleAccessControl.verifyPermission(user, 'Settings');

    return this._adminSettingsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Rota para recuperar um admin pelo seu id.',
    security: [{ bearerAuth: [] }],
  })
  @ApiOkResponse({ type: CreateAdminAloneDto })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async findById(@CurrentUser() user: User, @Param('id', ParseIntPipe) id: number) {
    handleAccessControl.verifyAdminRole(user);

    await handleAccessControl.verifyPermission(user, 'Settings');

    return this._adminSettingsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Rota para editar admin pelo id.', security: [{ bearerAuth: [] }] })
  @ApiOkResponse({ type: CreateAdminAloneDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async update(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAdminDto,
  ) {
    handleAccessControl.verifyAdminRole(user);

    await handleAccessControl.verifyPermission(user, 'Settings');

    return this._adminSettingsService.update(id, body);
  }
}
