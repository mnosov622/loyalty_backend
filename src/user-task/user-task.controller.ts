import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserTaskService } from './user-task.service';
import { userTaskDto } from './dto/userTaskDto';

@Controller('user-task')
export class UserTaskController {
  constructor(private userTaskService: UserTaskService) {}

  @Get()
  getTasks() {
    return this.userTaskService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') taskId: number) {
    return this.userTaskService.getTaskById(taskId as any);
  }

  @Post()
  startTask(@Body() userTaskDto: userTaskDto) {
    return this.userTaskService.startTask(userTaskDto);
  }
}
