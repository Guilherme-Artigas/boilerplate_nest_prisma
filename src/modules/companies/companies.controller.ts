import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import HandleAccessControl from '@utils/HandleAccessControl';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@ApiTags('companies')
@Controller('companies')
@UseGuards(JwtAuthGuard)
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post(':id/assign-user')
  @ApiOperation({ summary: 'Associa um usuário à empresa.' })
  async assignUser(
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) companyId: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    HandleAccessControl.verifyAdminRole(user);
    return this.companiesService.assignUser(companyId, userId);
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma empresa.' })
  async create(@Body() createCompanyDto: CreateCompanyDto) {
    const company = this.companiesService.create(createCompanyDto);
    return { message: 'Empresa criada com sucesso', company };
  }

  @Get()
  async findAll() {
    const companies = await this.companiesService.findAll();
    return { message: 'Lista de empresas', companies };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const company = await this.companiesService.findOne(+id);
    return { message: 'Detalhes da empresa', company };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: CreateCompanyDto) {
    const company = await this.companiesService.update(+id, updateCompanyDto);
    return { message: 'Empresa atualizada com sucesso', company };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.companiesService.remove(+id);
    return { message: 'Empresa removida com sucesso' };
  }
}
