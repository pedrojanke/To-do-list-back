import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { Project } from '../../projects/entities/project.entity';

@Entity('Models')
export class Model {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    name: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @UpdateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @ManyToOne(() => Project, project => project.models, { nullable: false })
    project: Project;

    @OneToMany(() => Item, item => item.model)
    items: Item[];
}