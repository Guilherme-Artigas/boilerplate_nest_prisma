import { Controller, Get, Post, Body, Param, Delete, Query, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductService } from 'src/modules/product/product.service';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { commonApiResponse } from 'src/documentation/common/api.response';
import { createProductDocItems } from 'src/documentation/product/createProduct.doc';
import { getAllProductsDocItems } from 'src/documentation/product/getAllProducts.doc';
import { getProductByIdDocItems } from 'src/documentation/product/getProductById.doc';
import { updateProductDocItems } from 'src/documentation/product/updateProduct.doc';
import { deleteProductDocItems } from 'src/documentation/product/deleteProduct.doc';

ApiTags('Products')
@ApiInternalServerErrorResponse(commonApiResponse.INTERNAL_SERVER_ERROR)
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @HttpCode(HttpStatus.OK)
    @ApiOkResponse(createProductDocItems.ApiResponse.OK)
    @ApiNotFoundResponse(createProductDocItems.ApiResponse.NOT_FOUND)
    @ApiOperation(createProductDocItems.Operation)
    @Post()
    async createProduct(@Body() createProductInput: CreateProductDto) {
        return this.productService.createProduct(createProductInput);
    }

    @ApiOkResponse(getAllProductsDocItems.ApiResponse.OK)
    @ApiOperation(getAllProductsDocItems.Operation)
    @ApiQuery(getAllProductsDocItems.ApiQuery.limit)
    @ApiQuery(getAllProductsDocItems.ApiQuery.page)
    @Get()
    async getAllProducts(@Query() paginateOptions: IPaginationOptions) {
        return this.productService.getAllProducts(paginateOptions);
    }

    @ApiOkResponse(getProductByIdDocItems.ApiResponse.OK)
    @ApiNotFoundResponse(getProductByIdDocItems.ApiResponse.NOT_FOUND)
    @ApiOperation(getProductByIdDocItems.Operation)
    @Get(':productId')
    async getProductById(@Param('productId') productId: string) {
        return this.productService.getProductById(productId);
    }

    @ApiOkResponse(updateProductDocItems.ApiResponse.OK)
    @ApiNotFoundResponse(updateProductDocItems.ApiResponse.NOT_FOUND)
    @ApiOperation(updateProductDocItems.Operation)
    @Put(':productId')
    async updateProduct(@Param('productId') productId: string, @Body() updateProductInput: UpdateProductDto) {
        return this.productService.updateProduct(productId, updateProductInput);
    }

    @ApiOkResponse(deleteProductDocItems.ApiResponse.OK)
    @ApiNotFoundResponse(deleteProductDocItems.ApiResponse.NOT_FOUND)
    @ApiOperation(deleteProductDocItems.Operation)
    @Delete(':productId')
    async deleteProduct(@Param('productId') productId: string) {
        return this.productService.deleteProduct(productId);
    }
}
