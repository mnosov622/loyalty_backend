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

  async getTaskById(id: number, userId: number) {
    try {
      const task = await UserTask.findOne({
        where: { taskId: id, userId: userId },
      });
      console.log('task', id, userId, task);
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

  async completeTask(userTaskDto: userTaskDto) {
    try {
      const task = await UserTask.findOne({
        where: { taskId: userTaskDto.taskId, userId: userTaskDto.userId },
      });
      if (!task) {
        return HttpStatus.NOT_FOUND;
      }
      await task.update({ ...userTaskDto });
      return { task, status: 200 };
    } catch (error) {
      throw error;
    }
  }

  async approveTask(userTaskDto: userTaskDto) {
    console.log('user', userTaskDto);
    try {
      const task = await UserTask.findOne({
        where: { taskId: userTaskDto.taskId, userId: userTaskDto.userId },
      });
      if (!task) {
        return HttpStatus.NOT_FOUND;
      }
      task.status = 'Approved';
      await task.save();
      return { task, status: 200 };
    } catch (error) {
      throw error;
    }
  }

  async rejectTask(userTaskDto: userTaskDto) {
    console.log('dto', userTaskDto);

    try {
      const task = await UserTask.findOne({
        where: { taskId: userTaskDto.taskId, userId: userTaskDto.userId },
      });
      if (!task) {
        return HttpStatus.NOT_FOUND;
      }
      task.status = 'Rejected';
      task.comment = userTaskDto.comment;
      await task.save();
      return { task, status: 200 };
    } catch (error) {
      throw error;
    }
  }
}
