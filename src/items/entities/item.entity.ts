import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Model } from '../../models/entities/model.entity';

@Entity('Items')
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ type: 'boolean', default: false })
    checked: boolean;

    @ManyToOne(() => Model, model => model.items, { nullable: false })
    model: Model;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
