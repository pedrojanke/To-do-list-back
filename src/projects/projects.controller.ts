import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto);
    }

    @Get()
    async findAll() {
        return this.projectsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.projectsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
        return this.projectsService.update(id, updateProjectDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.projectsService.delete(id);
    }
}
