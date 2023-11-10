import { HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './tasks.model';
import { TaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  async getTasks() {
    const tasks = await Task.findAll();
    return tasks;
  }

  async createTask(taskDto: TaskDto, imagePath: string) {
    if (!taskDto) throw new Error('No task data provided');
    try {
      const task = await Task.create({ ...taskDto, imagePath });
      return {
        task,
        status: HttpStatus.CREATED,
      };
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

  async updateTask(id: number, taskDto: TaskDto) {
    if (!id) throw new Error('No task id provided');
    if (!taskDto) throw new Error('No task data provided');
    try {
      const task = await Task.findByPk(id);
      if (!task) throw new Error('No task found');
      await task.update({ ...taskDto });
      return task;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteTask(id: number) {
    if (!id) throw new Error('No task id provided');
    try {
      const result = await Task.destroy({ where: { id } });
      if (result === 0) throw new Error('No task found');
      return { message: `Task with id ${id} has been deleted` };
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
