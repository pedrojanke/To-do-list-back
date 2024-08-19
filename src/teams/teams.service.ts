import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async create(createTeamDto: CreateTeamDto): Promise<Team> {
        const { name, user_id, owner_id } = createTeamDto;

        // Busca o dono do time
        const teamOwner = await this.userRepository.findOneBy({ id: owner_id });
        if (!teamOwner) {
            throw new NotFoundException('Owner not found');
        }

        // Busca os usuários a serem associados
        const users = await this.userRepository.findByIds(user_id);
        if (users.length !== user_id.length) {
            throw new NotFoundException('Some users not found');
        }

        // Cria o time e associa os usuários e o proprietário
        const team = this.teamRepository.create({
            name,
            owner: teamOwner,
            users,
            created_at: new Date(),
            updated_at: new Date(),
        });

        return this.teamRepository.save(team);
    }

    async findAll(): Promise<Team[]> {
        return this.teamRepository.find({
            relations: ['users', 'owner', 'projects'],
        });
    }

    async findOne(id: number): Promise<Team> {
        return this.teamRepository.findOneBy({ id });
    }

    async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
        await this.teamRepository.update(id, updateTeamDto);
        return this.teamRepository.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        const result = await this.teamRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Team with ID ${id} not found`);
        }
    }
}
