import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from 'src/modules/company/dto/create-company.dto';
import { UpdateCompanyDto } from 'src/modules/company/dto/update-company.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @Post()
    async createCompany(@Body() createCompanyInput: CreateCompanyDto) {
        return await this.companyService.createCompany(createCompanyInput);
    }

    @Get()
    async findAll(@Query() paginateOptions: IPaginationOptions) {
        return this.companyService.getAllCompanies(paginateOptions);
    }

    @Get(':companyId')
    async findOne(@Param('companyId') companyId: string) {
        return this.companyService.getCompanyById(companyId);
    }

    @Put(':companyId')
    async update(@Param('companyId') companyId: string, @Body() updateCompanyInput: UpdateCompanyDto) {
        return this.companyService.updateCompany(companyId, updateCompanyInput);
    }

    @Delete(':companyId')
    async remove(@Param('companyId') companyId: string) {
        return this.companyService.deleteCompany(companyId);
    }
}
