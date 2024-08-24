import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { Item } from './entities/item.entity';
import { Model } from 'src/models/entities/model.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { name, model_id } = createItemDto;

    // Busca o modelo
    const modelSelected = await this.modelRepository.findOneBy({
      id: model_id,
    });
    if (!modelSelected) {
      throw new NotFoundException('Model not found');
    }

    // Cria o item e associa ao modelo
    const item = this.itemRepository.create({
      name,
      model: modelSelected,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.itemRepository.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    return this.itemRepository.findOne({
      where: { id },
      relations: ['model'],
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update(id, updateItemDto);
    return this.itemRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
