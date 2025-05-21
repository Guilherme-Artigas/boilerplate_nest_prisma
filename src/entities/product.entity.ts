import { Company } from 'src/entities/company.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    ManyToOne,
} from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 250, nullable: false })
    name: string;

    @ManyToOne(() => Company, (company) => company.product)
    company: Company;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
