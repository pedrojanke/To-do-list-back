import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity({name: 'Users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 150, nullable: false })
    name: string;

    @Column({ length: 120, unique: true, nullable: false })
    email: string;

    @Column({ length: 16, nullable: false })
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToMany(() => Team, team => team.users)
    teams: Team[];
}