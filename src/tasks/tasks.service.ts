import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  async getTasks() {
    const tasks = await Task.findAll();
    return tasks;
  }

  async createTask(taskDto) {
    console.log('task', taskDto);
    const task = await Task.create(taskDto);
    return task;
  }
}
