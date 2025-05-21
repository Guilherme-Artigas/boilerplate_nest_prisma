import { Manager } from 'src/entities/manager.entity';
import { Product } from 'src/entities/product.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    DeleteDateColumn,
    OneToMany,
} from 'typeorm';

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255, nullable: false })
    name: string;

    @ManyToOne(() => Manager, (manager) => manager.company)
    manager: Manager;

    @OneToMany(() => Product, (product) => product.company)
    product: Product[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
