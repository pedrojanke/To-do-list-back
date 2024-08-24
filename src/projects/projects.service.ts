import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'src/teams/entities/team.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { name, description, team_id } = createProjectDto;

    // Busca os times a serem associados ao projeto
    const teams = await this.teamRepository.findByIds(team_id);
    if (teams.length !== team_id.length) {
      throw new NotFoundException('Some teams not found');
    }

    // Cria a entidade do projeto e associa os times
    const project = this.projectRepository.create({
      name,
      description,
      teams, // Associar os times ao projeto
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Salva e retorna o projeto
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['teams'],
    });
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
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
