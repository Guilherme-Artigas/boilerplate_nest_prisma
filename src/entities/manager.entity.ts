import { Company } from 'src/entities/company.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    Unique,
    Index,
    OneToMany,
} from 'typeorm';

@Entity('users')
@Unique(['email', 'cpf'])
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 250, nullable: false })
    name: string;

    @Index()
    @Column('varchar', { length: 100, nullable: true })
    email: string;

    @Column('varchar', { length: 20, nullable: true })
    phone: string;

    @Index()
    @Column('varchar', { length: 14, nullable: false })
    cpf: string;

    @OneToMany(() => Company, (company) => company.manager)
    company: Company[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
