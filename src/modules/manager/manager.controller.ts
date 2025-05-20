import { Controller, Get, Post, Body, Param, Delete, Query, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { commonApiResponse } from 'src/documentation/common/api.response';
import { createManagerDocItems } from 'src/documentation/manager/createManager.doc';
import { getAllManagersDocItems } from 'src/documentation/manager/getAllManagers.doc';
import { getManagerByIdDocItems } from 'src/documentation/manager/getManagerById.doc';
import { updateManagerDocItems } from 'src/documentation/manager/updateManager.doc';
import { deleteManagerDocItems } from 'src/documentation/manager/deleteManager.doc';

ApiTags('Managers')
@ApiInternalServerErrorResponse(commonApiResponse.INTERNAL_SERVER_ERROR)
@Controller('manager')
export class ManagerController {
    constructor(private readonly managerService: ManagerService) { }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse(createManagerDocItems.ApiResponse.OK)
    @ApiBadRequestResponse(createManagerDocItems.ApiResponse.BAD_REQUEST)
    @ApiOperation(createManagerDocItems.Operation)
    @Post()
    async createManager(@Body() createManagerInput: CreateManagerDto) {
        return this.managerService.createManager(createManagerInput);
    }

    @ApiOkResponse(getAllManagersDocItems.ApiResponse.OK)
    @ApiOperation(getAllManagersDocItems.Operation)
    @ApiQuery(getAllManagersDocItems.ApiQuery.limit)
    @ApiQuery(getAllManagersDocItems.ApiQuery.page)
    @Get()
    async getAllManagers(@Query() paginateOptions: IPaginationOptions) {
        return this.managerService.getAllManagers(paginateOptions);
    }

    @ApiOkResponse(getManagerByIdDocItems.ApiResponse.OK)
    @ApiNotFoundResponse(getManagerByIdDocItems.ApiResponse.NOT_FOUND)
    @ApiOperation(getManagerByIdDocItems.Operation)
    @Get(':managerId')
    async getManagerById(@Param('managerId') managerId: string) {
        return this.managerService.getManagerById(managerId);
    }

    @ApiOkResponse(updateManagerDocItems.ApiResponse.OK)
    @ApiBadRequestResponse(updateManagerDocItems.ApiResponse.BAD_REQUEST)
    @ApiNotFoundResponse(updateManagerDocItems.ApiResponse.NOT_FOUND)
    @ApiOperation(updateManagerDocItems.Operation)
    @Put(':managerId')
    async updateManager(@Param('managerId') managerId: string, @Body() updateManagerInput: UpdateManagerDto) {
        return this.managerService.updateManager(managerId, updateManagerInput);
    }

    @ApiOkResponse(deleteManagerDocItems.ApiResponse.OK)
    @ApiNotFoundResponse(deleteManagerDocItems.ApiResponse.NOT_FOUND)
    @ApiOperation(deleteManagerDocItems.Operation)
    @Delete(':managerId')
    async deleteManager(@Param('managerId') managerId: string) {
        return this.managerService.deleteManager(managerId);
    }
}
