import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FilesService } from './files.service';
import { existsSync, mkdirSync } from 'fs';

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
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = `files/${file?.filename}`;
    await this.fileService.createFile(filePath);
    return {
      statusCode: 200,
      message: 'File uploaded successfully',
      fileName: file,
    };
  }

  @Get(':name')
  getImageByName(@Param('name') name: string) {
    console.log('name', name);
  }
}
