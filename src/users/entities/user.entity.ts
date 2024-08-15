import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: 'Users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ length: 255, unique: true, nullable: false })
    email: string;

    @Column({ length: 255, nullable: false })
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}