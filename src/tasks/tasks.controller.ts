import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/tasks.dto';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Task } from './tasks.model';

// @UseGuards(AuthGuardService)
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
  @UseInterceptors(FileInterceptor('image'))
  createTask(@UploadedFile() image, @Body() task: TaskDto) {
    return this.tasksService.createTask({ ...task, image });
  }

  @Post(':id')
  updateTask(@Param('id') id: number, @Body() taskDto: TaskDto) {
    return this.tasksService.updateTask(id, taskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
