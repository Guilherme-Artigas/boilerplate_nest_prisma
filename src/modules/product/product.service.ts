import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Company } from 'src/entities/company.entity';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto } from 'src/modules/product/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/product/dto/update-product.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);
    private readonly productRepository: Repository<Product>;
    private readonly companyRepository: Repository<Company>;

    constructor(@InjectDataSource() dataSource: DataSource) {
        this.productRepository = dataSource.getRepository(Product);
        this.companyRepository = dataSource.getRepository(Company);
    }

    async createProduct(createProductInput: CreateProductDto) {
        try {
            this.logger.log(`Creating product with name: ${createProductInput.name}`);
            const company = await this.companyRepository.findOne({ where: { id: createProductInput.companyId } });
            if (!company) throw new NotFoundException('Company not found');
            const newProduct = await this.productRepository.save({ ...createProductInput, company });
            this.logger.log(`Product created successfully with ID: ${newProduct.id}`);
            return newProduct;
        } catch (error) {
            this.logger.error(`Failed to create product with NAME: ${createProductInput.name}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllProducts(paginateOptions: IPaginationOptions) {
        try {
            this.logger.log(`Fetching all products`);
            const products = await paginate(this.productRepository, paginateOptions, {
                order: { name: 'asc' },
            });
            this.logger.log(`Fetched products`);
            return products;
        } catch (error) {
            this.logger.error(`Failed to get products. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getProductById(productId: string) {
        try {
            this.logger.log(`Fetching product with ID: ${productId}`);
            const product = await this.productRepository.findOne({ where: { id: productId } });
            if (!product) throw new NotFoundException('Product not found');
            this.logger.log(`Fetched product with ID: ${productId}`);
            return product;
        } catch (error) {
            this.logger.error(`Failed to get product with ID: ${productId}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateProduct(productId: string, updateProductInput: UpdateProductDto) {
        try {
            this.logger.log(`Updating product with ID: ${productId}`);
            const product = await this.productRepository.findOne({ where: { id: productId }, relations: { company: true } });
            if (!product) throw new NotFoundException('Product not found');
            if (updateProductInput.companyId && updateProductInput.companyId !== product.company.id) {
                const company = await this.companyRepository.findOne({ where: { id: updateProductInput.companyId } })
                if (!company) throw new NotFoundException('Company not found')
                updateProductInput['company'] = company;
            }
            const updatedProduct = await this.productRepository.save({ ...product, ...updateProductInput });
            this.logger.log(`Product with ID ${productId} updated successfully`);
            return updatedProduct;
        } catch (error) {
            this.logger.error(`Failed to update product with ID: ${productId}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteProduct(productId: string) {
        try {
            this.logger.log(`Fetching product with ID: ${productId}`);
            const product = await this.productRepository.findOne({ where: { id: productId } });
            if (!product) throw new NotFoundException('product not found');
            await this.productRepository.softDelete(product.id);
            this.logger.log(`Product with ID ${productId} soft-deleted successfully`);
            return { id: product.id };
        } catch (error) {
            this.logger.error(`Failed to delete product with ID ${productId}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
