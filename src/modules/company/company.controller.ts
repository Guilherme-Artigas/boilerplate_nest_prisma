import { Controller, Get, Post, Body, Param, Delete, Put, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from 'src/modules/company/dto/create-company.dto';
import { UpdateCompanyDto } from 'src/modules/company/dto/update-company.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { commonApiResponse } from 'src/documentation/common/api.response';
import { createCompanyDocItems } from 'src/documentation/company/createCompany.doc';
import { deleteCompanyDocItems } from 'src/documentation/company/deleteCompany.doc';
import { getAllCompaniesDocItems } from 'src/documentation/company/getAllCompanies.doc';
import { getCompanyByIdDocItems } from 'src/documentation/company/getCompanyById.doc';
import { updateCompanyDocItems } from 'src/documentation/company/updateCompany.doc';

@ApiTags('Company')
@ApiInternalServerErrorResponse(commonApiResponse.INTERNAL_SERVER_ERROR)
@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) { }

    @ApiOkResponse(createCompanyDocItems.ApiResponse?.OK)
    @ApiBadRequestResponse(createCompanyDocItems.ApiResponse?.BAD_REQUEST)
    @ApiNotFoundResponse(createCompanyDocItems.ApiResponse?.NOT_FOUND)
    @ApiOperation(createCompanyDocItems.Operation)
    @HttpCode(HttpStatus.OK)
    @Post()
    async createCompany(@Body() createCompanyInput: CreateCompanyDto) {
        return await this.companyService.createCompany(createCompanyInput);
    }

    @ApiOkResponse(getAllCompaniesDocItems.ApiResponse?.OK)
    @ApiOperation(getAllCompaniesDocItems.Operation)
    @ApiQuery(getAllCompaniesDocItems.ApiQuery.page)
    @ApiQuery(getAllCompaniesDocItems.ApiQuery.limit)
    @Get()
    async getAllCompanies(@Query() paginateOptions: IPaginationOptions) {
        return this.companyService.getAllCompanies(paginateOptions);
    }

    @ApiOkResponse(getCompanyByIdDocItems.ApiResponse?.OK)
    @ApiNotFoundResponse(getCompanyByIdDocItems.ApiResponse?.NOT_FOUND)
    @ApiOperation(getCompanyByIdDocItems.Operation)
    @Get(':companyId')
    async getCompanyById(@Param('companyId') companyId: string) {
        return this.companyService.getCompanyById(companyId);
    }

    @ApiOkResponse(updateCompanyDocItems.ApiResponse.OK)
    @ApiNotFoundResponse(updateCompanyDocItems.ApiResponse.NOT_FOUND)
    @ApiOperation(updateCompanyDocItems.Operation)
    @Put(':companyId')
    async updateCompany(@Param('companyId') companyId: string, @Body() updateCompanyInput: UpdateCompanyDto) {
        return this.companyService.updateCompany(companyId, updateCompanyInput);
    }

    @ApiOkResponse(deleteCompanyDocItems.ApiResponse?.OK)
    @ApiNotFoundResponse(deleteCompanyDocItems.ApiResponse?.NOT_FOUND)
    @ApiOperation(deleteCompanyDocItems.Operation)
    @Delete(':companyId')
    async deleteCompany(@Param('companyId') companyId: string) {
        return this.companyService.deleteCompany(companyId);
    }
}
