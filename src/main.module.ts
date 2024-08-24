import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/entities/item.entity';
import { ItemsModule } from './items/items.module';
import { Model } from './models/entities/model.entity';
import { ModelsModule } from './models/models.module';
import { Project } from './projects/entities/project.entity';
import { ProjectsModule } from './projects/projects.module';
import { Team } from './teams/entities/team.entity';
import { TeamsModule } from './teams/teams.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'todolist',
      entities: [User, Team, Project, Model, Item],
      synchronize: true,
    }),
    UsersModule,
    TeamsModule,
    ProjectsModule,
    ModelsModule,
    ItemsModule,
  ],
})
export class AppModule {}
