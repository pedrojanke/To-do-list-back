import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>,
    ) { }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const item = this.itemRepository.create({
            ...createItemDto,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return this.itemRepository.save(item);
    }

    async findAll(): Promise<Item[]> {
        return this.itemRepository.find();
    }

    async findOne(id: number): Promise<Item> {
        return this.itemRepository.findOneBy({ id });
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
