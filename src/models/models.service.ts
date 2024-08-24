import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateModelDto } from './dtos/create-model.dto';
import { UpdateModelDto } from './dtos/update-model.dto';
import { Model } from './entities/model.entity';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createModelDto: CreateModelDto): Promise<Model> {
    const { name, project_id } = createModelDto;

    // Busca o projeto
    const projectSelected = await this.projectRepository.findOneBy({
      id: project_id,
    });
    if (!projectSelected) {
      throw new NotFoundException('Project not found');
    }

    // Cria o modelo e associa ao projeto
    const model = this.modelRepository.create({
      name,
      project: projectSelected,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.modelRepository.save(model);
  }

  async findAll(): Promise<Model[]> {
    return this.modelRepository.find({});
  }

  async findOne(id: number): Promise<Model> {
    return this.modelRepository.findOne({
      where: { id },
      relations: ['project'],
    });
  }

  async update(id: number, updateModelDto: UpdateModelDto): Promise<Model> {
    await this.modelRepository.update(id, updateModelDto);
    return this.modelRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    const result = await this.modelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
