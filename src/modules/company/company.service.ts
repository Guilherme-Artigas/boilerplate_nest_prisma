import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Company } from 'src/entities/company.entity';
import { Manager } from 'src/entities/manager.entity';
import { CreateCompanyDto } from 'src/modules/company/dto/create-company.dto';
import { UpdateCompanyDto } from 'src/modules/company/dto/update-company.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CompanyService {
    private readonly logger = new Logger(CompanyService.name);
    private readonly companyRepository: Repository<Company>;
    private readonly managerRepository: Repository<Manager>;

    constructor(@InjectDataSource() dataSource: DataSource) {
        this.companyRepository = dataSource.getRepository(Company);
        this.managerRepository = dataSource.getRepository(Manager);
    }

    async createCompany(createCompanyDto: CreateCompanyDto) {
        try {
            this.logger.log(`Creating company with name: ${createCompanyDto.name}`);
            const company = await this.companyRepository.findOne({ where: { name: createCompanyDto.name } })
            if (company) throw new BadRequestException('This company already exists')
            const manager = await this.managerRepository.findOne({ where: { id: createCompanyDto.managerId } })
            if (!manager) throw new NotFoundException('Manager not found')
            const newCompany = await this.companyRepository.save({ name: createCompanyDto.name, manager })
            this.logger.log(`Company created successfully with ID: ${newCompany.id}`);
            return newCompany;
        } catch (error) {
            this.logger.error(`Failed to create company with NAME: ${createCompanyDto.name}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllCompanies(paginateOptions: IPaginationOptions) {
        try {
            this.logger.log(`Fetching all companies`)
            const companies = await paginate(this.companyRepository, paginateOptions, { order: { name: 'asc' } })
            this.logger.log(`Fetched companies`);
            return companies;
        } catch (error) {
            this.logger.error(`Failed to get companies. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCompanyById(companyId: string) {
        try {
            this.logger.log(`Fetching company with ID: ${companyId}`);
            const company = await this.companyRepository.findOne({ where: { id: companyId } });
            if (!company) throw new NotFoundException('Company not found')
            this.logger.log(`Fetched company with ID: ${companyId}`);
            return company ?? {};
        } catch (error) {
            this.logger.error(`Failed to get company with ID: ${companyId} . Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateCompany(companyId: string, updateCompanyDto: UpdateCompanyDto) {
        try {
            this.logger.log(`Updating company with ID: ${companyId}`);
            const company = await this.companyRepository.findOne({ where: { id: companyId } });
            if (!company) throw new NotFoundException('Company not found')
            if (updateCompanyDto.managerId) {
                const manager = await this.managerRepository.findOne({ where: { id: updateCompanyDto.managerId } })
                if (!manager) throw new NotFoundException('Manager not found')
                updateCompanyDto['manager'] = manager;
            }
            const updatedCompany = await this.companyRepository.save({ ...company, ...updateCompanyDto });
            this.logger.log(`Company with ID ${companyId} updated successfully`);
            return updatedCompany;
        } catch (error) {
            this.logger.error(`Failed to update company with ID: ${companyId}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteCompany(companyId: string) {
        try {
            this.logger.log(`Fetching company with ID: ${companyId}`);
            const company = await this.companyRepository.findOne({ where: { id: companyId } });
            if (!company) throw new NotFoundException('Company not found')
            await this.companyRepository.softDelete(company.id)
            this.logger.log(`Company with ID ${companyId} soft-deleted successfully`)
            return { id: company.id };
        } catch (error) {
            this.logger.error(`Failed to delete company with ID ${companyId}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
