import { HttpStatus, Injectable } from '@nestjs/common';
import { UserTask } from './userTask.model';
import { userTaskDto } from './dto/userTaskDto';

@Injectable()
export class UserTaskService {
  async getTasks() {
    try {
      const tasks = await UserTask.findAll();
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(id: number) {
    try {
      const task = await UserTask.findOne({ where: { taskId: id } });
      if (!task) {
        return HttpStatus.NOT_FOUND;
      }
      return task;
    } catch (error) {
      throw error;
    }
  }

  async startTask(userTaskDto: userTaskDto) {
    try {
      const task = await UserTask.create({ ...userTaskDto });
      return { task, status: 201 };
    } catch (error) {
      throw error;
    }
  }
}
