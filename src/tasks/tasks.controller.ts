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
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { FilesService } from '@/files/files.service';

// @UseGuards(AuthGuardService)
@Controller('tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private fileService: FilesService,
  ) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dir = './files';
          if (!existsSync(dir)) {
            mkdirSync(dir);
          }
          cb(null, dir);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async createTask(@UploadedFile() image, @Body() task: TaskDto) {
    let imagePath = '';
    if (image) {
      imagePath = `files/${image.filename}`;
      await this.fileService.createFile(imagePath);
    }
    return await this.tasksService.createTask(task, imagePath);
  }

  @Post(':id')
  updateTask(@Param('id') id: number, @Body() taskDto: TaskDto) {
    return this.tasksService.updateTask(id, { ...taskDto });
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
