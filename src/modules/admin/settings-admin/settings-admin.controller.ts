import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AdminPermission, User } from '@prisma/client';
import handleAccessControl from '@utils/HandleAccessControl';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { IsPublic } from 'src/modules/auth/decorators/is-public.decorator';
import { CreateAdminAloneDto } from './dto/create-admin-alone.dto';
import { CreateAdminResponseDto } from './dto/create-admin-response.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PermissionResponseDto } from './dto/permission-response.dto';
import { QueryAdminDto } from './dto/query-admin.dto';
import { ResponseFindAllAdminDto } from './dto/response-find-all-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { SettingsAdminService } from './settings-admin.service';

@ApiTags('Configurações - Portal Gerencial')
@Controller('settings-admin')
export class SettingsAdminController {
  constructor(private readonly settingsAdminService: SettingsAdminService) {}

  @Post()
  @ApiOperation({
    summary: 'Rota para criar admins no portal gerencial.',
    security: [{ bearerAuth: [] }],
  })
  @ApiBody({ type: CreateAdminDto })
  @ApiCreatedResponse({ type: CreateAdminResponseDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async create(@CurrentUser() user: User, @Body() payload: CreateAdminDto) {
    handleAccessControl.verifyAdminRole(user);

    await handleAccessControl.verifyPermission(user, 'Configuracoes');

    return this.settingsAdminService.create(payload);
  }

  @IsPublic()
  @Get('all-permissions')
  @ApiOperation({ summary: 'Rota que recupera todas as permissões.' })
  @ApiOkResponse({ type: [PermissionResponseDto] })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  async findAllPermissions(): Promise<AdminPermission[]> {
    return this.settingsAdminService.findAllPermissions();
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

    await handleAccessControl.verifyPermission(user, 'Configuracoes');

    return this.settingsAdminService.findAll(query);
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

    await handleAccessControl.verifyPermission(user, 'Configuracoes');

    return this.settingsAdminService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Rota para editar admin pelo id.', security: [{ bearerAuth: [] }] })
  @ApiOkResponse({ type: CreateAdminAloneDto })
  @ApiBadRequestResponse({ description: 'Requisição inválida' })
  @ApiUnauthorizedResponse({ description: 'Token inválido.' })
  @ApiForbiddenResponse({ description: 'Acesso não autorizado.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAdminDto) {
    return this.settingsAdminService.update(id, body);
  }
}
