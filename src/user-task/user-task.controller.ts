import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  getTaskById(@Param('id') taskId: number, @Query('userId') userId: number) {
    return this.userTaskService.getTaskById(taskId as number, userId as number);
  }

  @Post()
  startTask(@Body() userTaskDto: userTaskDto) {
    return this.userTaskService.startTask(userTaskDto);
  }

  @Post('/complete')
  completeTask(@Body() userTaskDto: userTaskDto) {
    return this.userTaskService.completeTask(userTaskDto);
  }

  @Post('/approve')
  approveTask(@Body() userTaskDto: userTaskDto) {
    return this.userTaskService.approveTask(userTaskDto);
  }

  @Post('/reject')
  rejectTask(@Body() userTaskDto: userTaskDto) {
    return this.userTaskService.rejectTask(userTaskDto);
  }
}
