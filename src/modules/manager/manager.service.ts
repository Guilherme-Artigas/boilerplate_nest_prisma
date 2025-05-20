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
import { Manager } from 'src/entities/manager.entity';
import { CreateManagerDto } from 'src/modules/manager/dto/create-manager.dto';
import { UpdateManagerDto } from 'src/modules/manager/dto/update-manager.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ManagerService {
    private readonly logger = new Logger(ManagerService.name);
    private readonly managerRepository: Repository<Manager>;

    constructor(@InjectDataSource() dataSource: DataSource) {
        this.managerRepository = dataSource.getRepository(Manager);
    }

    async createManager(createManagerDto: CreateManagerDto) {
        try {
            this.logger.log(`Creating manager with name: ${createManagerDto.name}, email: ${createManagerDto.email}`);
            const existingManager = await this.managerRepository.findOne({
                where: [{ email: createManagerDto.email }, { cpf: createManagerDto.cpf }],
            });
            if (existingManager) throw new BadRequestException('This manager already exists');
            const newManager = await this.managerRepository.save({ ...createManagerDto });
            this.logger.log(`Manager created successfully with ID: ${newManager.id}`);
            return newManager;
        } catch (error) {
            this.logger.error(`Failed to create manager with NAME: ${createManagerDto.name}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllManagers(paginateOptions: IPaginationOptions) {
        try {
            this.logger.log(`Fetching all managers`);
            const managers = await paginate(this.managerRepository, paginateOptions, {
                order: { name: 'asc' },
            });
            this.logger.log(`Fetched managers`);
            return managers;
        } catch (error) {
            this.logger.error(`Failed to get managers. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getManagerById(managerId: string) {
        try {
            this.logger.log(`Fetching manager with ID: ${managerId}`);
            const manager = await this.managerRepository.findOne({ where: { id: managerId } });
            if (!manager) throw new NotFoundException('Manager not found');
            this.logger.log(`Fetched manager with ID: ${managerId}`);
            return manager;
        } catch (error) {
            this.logger.error(`Failed to get manager with ID: ${managerId}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateManager(managerId: string, updateManagerDto: UpdateManagerDto) {
        try {
            this.logger.log(`Updating manager with ID: ${managerId}`);
            const manager = await this.managerRepository.findOne({ where: { id: managerId } });
            if (!manager) throw new NotFoundException('Manager not found');
            if (updateManagerDto.cpf && updateManagerDto.cpf !== manager.cpf) {
                const cpfInUse = await this.managerRepository.findOne({ where: { cpf: updateManagerDto.cpf } });
                if (cpfInUse) throw new BadRequestException('Cpf in use');
            }
            const updatedManager = await this.managerRepository.save({ ...manager, ...updateManagerDto });
            this.logger.log(`Manager with ID ${managerId} updated successfully`);
            return updatedManager;
        } catch (error) {
            this.logger.error(`Failed to update manager with ID: ${managerId}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteManager(managerId: string) {
        try {
            this.logger.log(`Fetching manager with ID: ${managerId}`);
            const manager = await this.managerRepository.findOne({ where: { id: managerId } });
            if (!manager) throw new NotFoundException('Manager not found');
            await this.managerRepository.softDelete(manager.id);
            this.logger.log(`Manager with ID ${managerId} soft-deleted successfully`);
            return { id: manager.id };
        } catch (error) {
            this.logger.error(`Failed to delete manager with ID ${managerId}. Error: ${error.message}.`);
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
