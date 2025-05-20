import { Manager } from 'src/entities/manager.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 255, nullable: false })
    name: string;

    @ManyToOne(() => Manager, (manager) => manager.company)
    manager: Manager;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;
}
