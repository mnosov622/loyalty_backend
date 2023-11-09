import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { existsSync, mkdirSync } from 'fs';
import { AuthGuardService } from '@/auth-guard/auth-guard.service';

@UseGuards(AuthGuardService)
@Controller('files')
export class FilesController {
  constructor(private fileService: FilesService) {}

  // to upload an image send the file as form-data

  //   const file = this.files[0];
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   console.log('file', file);
  //   fetch('http://localhost:5000/files/upload', {
  //       method: 'POST',
  //       body: formData,
  //   });

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File was not found');
    }
    console.log('file');
    const filePath = `files/${file?.filename}`;
    await this.fileService.createFile(filePath);
    return {
      statusCode: 200,
      message: 'File uploaded successfully',
      fileName: file,
    };
  }
}
