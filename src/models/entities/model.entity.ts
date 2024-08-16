import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
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
}