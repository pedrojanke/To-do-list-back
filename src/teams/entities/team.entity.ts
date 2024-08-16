import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
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

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
