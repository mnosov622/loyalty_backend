import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from '@/users/dto/users.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(@Body() taskDto: TaskDto) {
    if (!taskDto) throw new Error('No task data provided');
    return this.tasksService.createTask(taskDto);
  }
}
