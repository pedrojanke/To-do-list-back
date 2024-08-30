import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      url: process.env.DATABASE_URL,
      entities: [User, Team, Project, Model, Item],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      }
    }),
    UsersModule,
    TeamsModule,
    ProjectsModule,
    ModelsModule,
    ItemsModule,
  ],
})
export class AppModule {}
