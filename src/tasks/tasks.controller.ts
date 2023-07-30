import { Controller, Get, Post, Query, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { Body, Put } from '@nestjs/common/decorators';
import { CreateTaskDto } from './createTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  async getAllTasks(
    @Query('sortBy') sortBy: string,
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.taskService.getTasks(sortBy, search, page, limit);
  }

  @Get('/:id')
  async getTaskById(@Param('id') taskId: string): Promise<Task> {
    return this.taskService.getTaskById(taskId);
  }

  @Post()
  async createTask(@Body() body: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(body);
  }

  @Put('/:id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() body: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(taskId, body);
  }
}
