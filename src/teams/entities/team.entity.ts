import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';

@Entity('Teams')
export class Team {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    name: string;

    @ManyToMany(() => User, user => user.teams)
    @JoinTable({
        name: 'user_teams',
        joinColumn: { name: 'team_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
    })
    users: User[];

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'owner_id' })
    owner: User;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @ManyToMany(() => Project, project => project.teams)
    projects: Project[];
}
