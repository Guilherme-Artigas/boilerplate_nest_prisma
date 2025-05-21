import { Company } from 'src/entities/company.entity';
import { Manager } from 'src/entities/manager.entity';
import { Product } from 'src/entities/product.entity';
import { DataSource } from 'typeorm';

export async function seed(dataSource: DataSource) {
    const companyRepository = dataSource.getRepository(Company);
    const managerRepository = dataSource.getRepository(Manager);
    const productRepository = dataSource.getRepository(Product);

    const manager = managerRepository.create({
        name: 'Any Name',
        email: 'any_email@mail.com',
        cpf: '12345678900',
        phone: '31999999999',
    });
    await managerRepository.save(manager);
    const company = companyRepository.create({
        name: 'Any Company',
        manager,
    });
    await companyRepository.save(company);
    const product1 = productRepository.create({
        name: 'Product A',
        company,
    });
    const product2 = productRepository.create({
        name: 'Product B',
        company,
    });
    await productRepository.save([product1, product2]);
    console.log('Seed concluído com sucesso!');
}
