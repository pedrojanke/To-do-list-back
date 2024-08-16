import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../../teams/entities/team.entity';

@Entity('Projects')
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ length: 255, nullable: false })
    description: string;

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date;

    @CreateDateColumn({type: 'timestamp'})
    updated_at: Date;

    @ManyToMany(() => Team, team => team.projects)
    @JoinTable({
        name: 'project_teams',
        joinColumn: { name: 'project_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'team_id', referencedColumnName: 'id' }
    })
    teams: Team[];
}