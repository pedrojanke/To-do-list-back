import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamsService {
    constructor(
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) { }

    async create(createTeamDto: CreateTeamDto): Promise<Team> {
        const team = this.teamRepository.create({
            ...createTeamDto,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return this.teamRepository.save(team);
    }

    async findAll(): Promise<Team[]> {
        return this.teamRepository.find();
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
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
