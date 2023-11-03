import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';
import { TaskDto } from '@/users/dto/users.dto';

@Injectable()
export class TasksService {
  async getTasks() {
    const tasks = await Task.findAll();
    return tasks;
  }

  async createTask(taskDto: TaskDto) {
    try {
      const task = await Task.create({ ...taskDto });
      return task;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTaskById(id: number) {
    if (!id) throw new Error('No task id provided');
    try {
      const task = await Task.findByPk(id);
      if (!task) throw new Error('No task found');
      return task;
    } catch (e) {
      throw new Error(e);
    }
  }
}
