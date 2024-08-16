import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    async create(createProjectDto: CreateProjectDto): Promise<Project> {
        const project = this.projectRepository.create({
            ...createProjectDto,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return this.projectRepository.save(project);
    }

    async findAll(): Promise<Project[]> {
        return this.projectRepository.find();
    }

    async findOne(id: number): Promise<Project> {
        return this.projectRepository.findOneBy({ id });
    }

    async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
        await this.projectRepository.update(id, updateProjectDto);
        return this.projectRepository.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        const result = await this.projectRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
    }
}
