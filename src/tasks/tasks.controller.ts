import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() taskDto: TaskDto) {
    if (!taskDto) throw new Error('No task data provided');
    return this.tasksService.createTask(taskDto);
  }
}
