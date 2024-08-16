import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTeamDto } from './dtos/create-team.dto';
import { UpdateTeamDto } from './dtos/update-team.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) { }

    @Post()
    async create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamsService.create(createTeamDto);
    }

    @Get()
    async findAll() {
        return this.teamsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.teamsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateTeamDto: UpdateTeamDto,
    ) {
        return this.teamsService.update(id, updateTeamDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.teamsService.delete(id);
    }
}
