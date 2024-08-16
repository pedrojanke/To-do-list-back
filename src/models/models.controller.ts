import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateModelDto } from './dtos/create-model.dto';
import { UpdateModelDto } from './dtos/update-model.dto';
import { ModelsService } from './models.service';

@Controller('models')
export class ModelsController {
    constructor(private readonly modelsService: ModelsService) { }

    @Post()
    async create(@Body() createModelDto: CreateModelDto) {
        return this.modelsService.create(createModelDto);
    }

    @Get()
    async findAll() {
        return this.modelsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.modelsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateModelDto: UpdateModelDto,
    ) {
        return this.modelsService.update(id, updateModelDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.modelsService.delete(id);
    }
}
