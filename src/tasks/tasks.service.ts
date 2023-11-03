import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  async getTasks() {
    const tasks = await Task.findAll();
    return tasks;
  }
}
