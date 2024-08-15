import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
}

@Get()
async findAll() {
    return this.usersService.findAll();
}

@Get(':id')
async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
}

@Patch(':id')
async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
) {
    return this.usersService.update(id, updateUserDto);
}
}
