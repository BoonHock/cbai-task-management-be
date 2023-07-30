import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeOrmConfig),
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})
export class AppModule {}
