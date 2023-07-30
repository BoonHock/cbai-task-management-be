import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateTaskDto } from './createTask.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async getTasks(sortBy: string, search: string, page: number, limit: number) {
    const query = this.taskRepository.createQueryBuilder('task');
    if (sortBy === 'due') {
      query.orderBy('task.dueDate', 'ASC');
    } else {
      query.orderBy('task.createdDate', 'ASC');
    }

    if (search) {
      query.where('task.name LIKE :search', { search: `%${search}%` });
    }

    query.skip((page - 1) * limit).take(limit);

    const [task, total] = await query.getManyAndCount();

    return {
      data: task,
      total: total,
    };
  }

  async getTaskById(taskId: string): Promise<Task> {
    const query = this.taskRepository.createQueryBuilder('task');
    query.where('task.id = :taskId', { taskId: taskId });
    return query.getOne();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const createTask = this.taskRepository.create(createTaskDto);
    createTask.createdDate = new Date();

    const query = this.taskRepository
      .createQueryBuilder()
      .insert()
      .into(Task)
      .values(createTask);

    const result = await query.execute();
    return result.raw[0];
  }

  async updateTask(
    taskId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const query = this.taskRepository
      .createQueryBuilder()
      .update(Task)
      .set(createTaskDto)
      .where('id = :taskId', { taskId: taskId });

    await query.execute();
    return this.getTaskById(taskId);
  }
}
